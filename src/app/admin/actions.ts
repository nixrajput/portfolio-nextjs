"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
} from "@/db/schema";
import {
  profileInsertSchema,
  projectInsertSchema,
  experienceInsertSchema,
  skillInsertSchema,
  serviceInsertSchema,
  socialLinkInsertSchema,
  fundingLinkInsertSchema,
  reorderSchema,
  type ProfileInput,
  type ProjectInput,
  type ExperienceInput,
  type SkillInput,
  type ServiceInput,
  type SocialLinkInput,
  type FundingLinkInput,
  type ReorderInput,
} from "@/lib/schemas";
import { auth } from "@/auth";
import { revalidatePortfolio } from "@/lib/revalidate";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

// ---------- Profile (single row id=1) ----------
export async function updateProfile(input: ProfileInput): Promise<void> {
  await requireAdmin();
  const data = profileInsertSchema.parse(input);
  await db
    .update(profile)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(profile.id, 1));
  revalidatePortfolio();
}

// ---------- Projects ----------
export async function createProject(input: ProjectInput): Promise<void> {
  await requireAdmin();
  const data = projectInsertSchema.parse(input);
  await db.insert(projects).values(data);
  revalidatePortfolio();
}

export async function updateProject(id: number, input: ProjectInput): Promise<void> {
  await requireAdmin();
  const data = projectInsertSchema.parse(input);
  await db.update(projects).set(data).where(eq(projects.id, id));
  revalidatePortfolio();
}

export async function deleteProject(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePortfolio();
}

export async function reorderProjects(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) => db.update(projects).set({ order: i.order }).where(eq(projects.id, i.id))),
  );
  revalidatePortfolio();
}

// ---------- Experiences ----------
export async function createExperience(input: ExperienceInput): Promise<void> {
  await requireAdmin();
  await db.insert(experiences).values(experienceInsertSchema.parse(input));
  revalidatePortfolio();
}

export async function updateExperience(id: number, input: ExperienceInput): Promise<void> {
  await requireAdmin();
  await db
    .update(experiences)
    .set(experienceInsertSchema.parse(input))
    .where(eq(experiences.id, id));
  revalidatePortfolio();
}

export async function deleteExperience(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePortfolio();
}

export async function reorderExperiences(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) =>
      db.update(experiences).set({ order: i.order }).where(eq(experiences.id, i.id)),
    ),
  );
  revalidatePortfolio();
}

// ---------- Skills ----------
export async function createSkill(input: SkillInput): Promise<void> {
  await requireAdmin();
  await db.insert(skills).values(skillInsertSchema.parse(input));
  revalidatePortfolio();
}

export async function updateSkill(id: number, input: SkillInput): Promise<void> {
  await requireAdmin();
  await db.update(skills).set(skillInsertSchema.parse(input)).where(eq(skills.id, id));
  revalidatePortfolio();
}

export async function deleteSkill(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePortfolio();
}

export async function reorderSkills(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) => db.update(skills).set({ order: i.order }).where(eq(skills.id, i.id))),
  );
  revalidatePortfolio();
}

// ---------- Services ----------
export async function createService(input: ServiceInput): Promise<void> {
  await requireAdmin();
  await db.insert(services).values(serviceInsertSchema.parse(input));
  revalidatePortfolio();
}

export async function updateService(id: number, input: ServiceInput): Promise<void> {
  await requireAdmin();
  await db.update(services).set(serviceInsertSchema.parse(input)).where(eq(services.id, id));
  revalidatePortfolio();
}

export async function deleteService(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  revalidatePortfolio();
}

export async function reorderServices(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) => db.update(services).set({ order: i.order }).where(eq(services.id, i.id))),
  );
  revalidatePortfolio();
}

// ---------- SocialLinks ----------
export async function createSocialLink(input: SocialLinkInput): Promise<void> {
  await requireAdmin();
  await db.insert(socialLinks).values(socialLinkInsertSchema.parse(input));
  revalidatePortfolio();
}

export async function updateSocialLink(id: number, input: SocialLinkInput): Promise<void> {
  await requireAdmin();
  await db
    .update(socialLinks)
    .set(socialLinkInsertSchema.parse(input))
    .where(eq(socialLinks.id, id));
  revalidatePortfolio();
}

export async function deleteSocialLink(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePortfolio();
}

export async function reorderSocialLinks(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) =>
      db.update(socialLinks).set({ order: i.order }).where(eq(socialLinks.id, i.id)),
    ),
  );
  revalidatePortfolio();
}

// ---------- FundingLinks ----------
export async function createFundingLink(input: FundingLinkInput): Promise<void> {
  await requireAdmin();
  await db.insert(fundingLinks).values(fundingLinkInsertSchema.parse(input));
  revalidatePortfolio();
}

export async function updateFundingLink(id: number, input: FundingLinkInput): Promise<void> {
  await requireAdmin();
  await db
    .update(fundingLinks)
    .set(fundingLinkInsertSchema.parse(input))
    .where(eq(fundingLinks.id, id));
  revalidatePortfolio();
}

export async function deleteFundingLink(id: number): Promise<void> {
  await requireAdmin();
  await db.delete(fundingLinks).where(eq(fundingLinks.id, id));
  revalidatePortfolio();
}

export async function reorderFundingLinks(input: ReorderInput): Promise<void> {
  await requireAdmin();
  const { items } = reorderSchema.parse(input);
  await Promise.all(
    items.map((i) =>
      db.update(fundingLinks).set({ order: i.order }).where(eq(fundingLinks.id, i.id)),
    ),
  );
  revalidatePortfolio();
}
