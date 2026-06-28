import { asc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import {
  profile,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
  taglines,
} from "@/db/schema";
import type { Experience, Skill, Service } from "@/db/schema";
import { getProjects } from "@/lib/projects";
import type { MergedProject } from "@/lib/projects";

// ── Public row types ────────────────────────────────────────────────────────

export type ExperienceRow = Experience;
export type SkillRow = Skill;
export type ServiceRow = Service;

export type SocialRow = {
  platform: string;
  url: string;
  username: string;
  order: number;
};

export type FundingRow = {
  label: string;
  url: string;
  primary: boolean;
  order: number;
};

// ── Re-export ────────────────────────────────────────────────────────────────

export type { MergedProject };
export { getProjects as getProjectsMerged };

// ── Helpers ──────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<{
  name: string;
  headline: string;
  bio: string;
  roles: string[];
  avatarUrl: string;
  resumeUrl: string;
  stats: { years: number; repos: number; stars: number };
}> {
  const rows = await db.select().from(profile);
  const row = rows[0];
  if (!row) throw new Error("Profile row not found");

  const s = row.stats as Record<string, unknown>;

  return {
    name: row.name,
    headline: row.headline,
    bio: row.bio,
    avatarUrl: (row.avatarUrl as string) ?? "",
    resumeUrl: (row.resumeUrl as string) ?? "",
    roles: row.roles,
    stats: {
      years: Number(s.years ?? 0),
      repos: Number(s.repos ?? 0),
      stars: Number(s.stars ?? 0),
    },
  };
}

export async function getExperiences(): Promise<ExperienceRow[]> {
  return db.select().from(experiences).orderBy(asc(experiences.order));
}

export async function getSkills(): Promise<SkillRow[]> {
  return db.select().from(skills).orderBy(asc(skills.order));
}

export async function getServices(): Promise<ServiceRow[]> {
  return db.select().from(services).orderBy(asc(services.order));
}

export async function getSocialLinks(): Promise<SocialRow[]> {
  const rows = await db.select().from(socialLinks).orderBy(asc(socialLinks.order));
  return rows.map((r) => ({
    platform: r.platform,
    url: r.url,
    username: r.username ?? "",
    order: r.order,
  }));
}

export async function getFundingLinks(): Promise<FundingRow[]> {
  const rows = await db.select().from(fundingLinks).orderBy(asc(fundingLinks.order));
  return rows.map((r) => ({
    label: r.label,
    url: r.url,
    primary: r.primary,
    order: r.order,
  }));
}

// Returns a random active tagline text.
// The page uses ISR (1h revalidation), so the tagline rotates on each
// revalidation cycle. In dev and after admin edits (revalidatePortfolio),
// it runs fresh. The random pick happens in JS after fetching all active rows.
export async function getRandomTagline(): Promise<string> {
  const rows = await db.select().from(taglines).where(eq(taglines.active, true));
  if (rows.length === 0) return "Rise above limits";
  const pick = rows[Math.floor(Math.random() * rows.length)];
  return pick.text;
}
