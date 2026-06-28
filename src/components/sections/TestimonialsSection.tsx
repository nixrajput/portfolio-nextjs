import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { testimonials } from "@/db/schema";
import { Testimonials } from "./Testimonials";

export async function TestimonialsSection() {
  const rows = await db
    .select({
      id: testimonials.id,
      name: testimonials.name,
      relationship: testimonials.relationship,
      content: testimonials.content,
      imageUrl: testimonials.imageUrl,
      linkedinUrl: testimonials.linkedinUrl,
      githubUrl: testimonials.githubUrl,
      xUrl: testimonials.xUrl,
      websiteUrl: testimonials.websiteUrl,
    })
    .from(testimonials)
    .where(eq(testimonials.status, "approved"))
    .orderBy(desc(testimonials.featured), asc(testimonials.order));

  return <Testimonials items={rows} />;
}
