import { z } from "zod";

// ---------- Table insert/update validators (admin form input) ----------

export const profileInsertSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  summary: z.string().min(1),
  stats: z.record(z.string(), z.union([z.string(), z.number()])).default({}),
  roles: z.array(z.string()).default([]),
  availableForWork: z.boolean().default(true),
  resumeUrl: z.string().url().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export const projectInsertSchema = z.object({
  repo: z
    .string()
    .min(1)
    .regex(/^[\w.-]+$/, "repo must be a GitHub slug, not a URL"),
  title: z.string().min(1),
  customBlurb: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  hidden: z.boolean().default(false),
});

export const experienceInsertSchema = z.object({
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.string().min(1),
  location: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  description: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0),
});

export const skillInsertSchema = z.object({
  name: z.string().min(1),
  iconPath: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(["Expert", "Intermediate", "Beginner"]).nullable().optional(),
  order: z.number().int().nonnegative().default(0),
});

export const serviceInsertSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  icons: z.array(z.string()).default([]),
  order: z.number().int().nonnegative().default(0),
});

export const socialLinkInsertSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url(),
  username: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  order: z.number().int().nonnegative().default(0),
});

export const fundingLinkInsertSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  primary: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
});

// Reorder payload shared by all sections
export const reorderSchema = z.object({
  items: z.array(z.object({ id: z.number().int(), order: z.number().int() })),
});

// ---------- GitHub REST API response ----------
// https://docs.github.com/en/rest/repos/repos#get-a-repository
export const githubRepoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  topics: z.array(z.string()).default([]),
  fork: z.boolean(),
  archived: z.boolean(),
  pushed_at: z.string(),
});

export const githubRepoListSchema = z.array(githubRepoSchema);

// ---------- Inferred types ----------
export type ProfileInput = z.infer<typeof profileInsertSchema>;
export type ProjectInput = z.infer<typeof projectInsertSchema>;
export type ExperienceInput = z.infer<typeof experienceInsertSchema>;
export type SkillInput = z.infer<typeof skillInsertSchema>;
export type ServiceInput = z.infer<typeof serviceInsertSchema>;
export type SocialLinkInput = z.infer<typeof socialLinkInsertSchema>;
export type FundingLinkInput = z.infer<typeof fundingLinkInsertSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type GithubRepo = z.infer<typeof githubRepoSchema>;
