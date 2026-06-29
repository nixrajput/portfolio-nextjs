"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { auth } from "@/auth";
import { revalidatePortfolio } from "@/lib/revalidate";
import { moderateTestimonialSchema, reorderTestimonialsSchema } from "@/lib/validation/testimonial";
import { revalidatePath } from "next/cache";

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function refresh(): void {
  revalidatePath("/admin/testimonials");
  revalidatePortfolio();
}

export async function approveTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const { id: validId } = moderateTestimonialSchema.parse({ id, action: "approve" });
  await db.update(testimonials).set({ status: "approved" }).where(eq(testimonials.id, validId));
  refresh();
}

export async function rejectTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const { id: validId } = moderateTestimonialSchema.parse({ id, action: "reject" });
  await db.update(testimonials).set({ status: "rejected" }).where(eq(testimonials.id, validId));
  refresh();
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const { id: validId } = moderateTestimonialSchema.parse({ id, action: "delete" });
  await db.delete(testimonials).where(eq(testimonials.id, validId));
  refresh();
}

export async function toggleFeatured(id: string, featured: boolean): Promise<void> {
  await requireAdmin();
  const action = featured ? "feature" : "unfeature";
  const { id: validId } = moderateTestimonialSchema.parse({ id, action });
  await db.update(testimonials).set({ featured }).where(eq(testimonials.id, validId));
  refresh();
}

export async function reorderTestimonials(ids: string[]): Promise<void> {
  await requireAdmin();
  const { ids: validIds } = reorderTestimonialsSchema.parse({ ids });
  await Promise.all(
    validIds.map((id, index) =>
      db.update(testimonials).set({ order: index }).where(eq(testimonials.id, id)),
    ),
  );
  refresh();
}
