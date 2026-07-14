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
  faqs,
} from "@/db/schema";
import type { Experience, Skill, Service, Faq } from "@/db/schema";
import { getProjects } from "@/lib/projects";
import type { MergedProject } from "@/lib/projects";
import { getCachedUserStats } from "@/lib/github-cache";

// Bundled asset shown when the profile has no avatar set yet (e.g. before the
// admin uploads one). Served from `public/`, so a relative src is correct here.
const FALLBACK_AVATAR = "/images/nikhil.png";

// GitHub account backing the live stats (same owner as the curated repos).
const GITHUB_USERNAME = "nixrajput";

// Years building = current year minus the first year the user contributed.
function yearsBuilding(firstContributionYear: number): number {
  return Math.max(0, new Date().getFullYear() - firstContributionYear);
}

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
  bio: string;
  roles: string[];
  avatarUrl: string;
  resumeUrl: string;
  heroTagline: string | null;
  sectionVisibility: Record<string, boolean>;
  stats: { years: number; repos: number; stars: number; followers: number };
}> {
  const rows = await db.select().from(profile);
  const row = rows[0];
  if (!row) throw new Error("Profile row not found");

  const s = row.stats as Record<string, unknown>;

  // All four GitHub-derived stats come from the persistent user cache: served
  // from the last-known-good row instantly and refreshed in the background, so
  // they never flash blank. Each falls back to the seeded stats blob only on a
  // cold cache with a failed first fetch.
  //  - repos:     public repo count
  //  - stars:     sum of stargazers across ALL public repos
  //  - followers: follower count
  //  - years:     whole years since the first contribution
  const userStats = await getCachedUserStats(GITHUB_USERNAME);
  const followers = userStats ? userStats.followers : Number(s.followers ?? 0);
  const repos =
    userStats && userStats.publicRepos > 0 ? userStats.publicRepos : Number(s.repos ?? 0);
  const stars = userStats && userStats.totalStars > 0 ? userStats.totalStars : Number(s.stars ?? 0);
  const years = userStats?.firstContributionYear
    ? yearsBuilding(userStats.firstContributionYear)
    : Number(s.years ?? 0);

  return {
    name: row.name,
    bio: row.bio,
    avatarUrl: (row.avatarUrl as string) || FALLBACK_AVATAR,
    resumeUrl: (row.resumeUrl as string) ?? "",
    heroTagline: row.heroTagline ?? null,
    sectionVisibility: (row.sectionVisibility as Record<string, boolean>) ?? {},
    roles: row.roles,
    stats: { years, repos, stars, followers },
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

export type FaqRow = Faq;

export async function getFaqs(): Promise<FaqRow[]> {
  return db.select().from(faqs).orderBy(asc(faqs.order));
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
