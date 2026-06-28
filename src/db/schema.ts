import {
  pgTable,
  pgEnum,
  serial,
  text,
  varchar,
  uuid,
  integer,
  boolean,
  jsonb,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

// profile — single-row table (id = 1 by convention)
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  headline: text("headline").notNull(),
  bio: text("bio").notNull(),
  // entity-first summary used in JSON-LD / GEO
  summary: text("summary").notNull(),
  // arbitrary stat blocks e.g. { years: 4, repos: 60, stars: 1200 }
  stats: jsonb("stats").$type<Record<string, string | number>>().notNull().default({}),
  roles: jsonb("roles").$type<string[]>().notNull().default([]),
  resumeUrl: text("resume_url"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// projects — curation rows; live stats merged from GitHub at request time
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  // GitHub slug only (e.g. "flutter_carousel_widget"), NOT full URL
  repo: varchar("repo", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  customBlurb: text("custom_blurb"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  hidden: boolean("hidden").notNull().default(false),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  org: text("org").notNull(),
  period: text("period").notNull(),
  location: text("location"),
  isCurrent: boolean("is_current").notNull().default(false),
  description: jsonb("description").$type<string[]>().notNull().default([]),
  order: integer("order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  iconPath: text("icon_path").notNull(),
  category: text("category").notNull(),
  level: text("level"), // "Expert" | "Intermediate" | "Beginner"
  order: integer("order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  icon: text("icon"),
  order: integer("order").notNull().default(0),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  username: text("username"),
  order: integer("order").notNull().default(0),
});

export const fundingLinks = pgTable("funding_links", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  primary: boolean("primary").notNull().default(false),
  order: integer("order").notNull().default(0),
});

// Auth.js adapter tables (required by @auth/drizzle-adapter)
export const authUsers = pgTable("auth_users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const authAccounts = pgTable(
  "auth_accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })],
);

export const authSessions = pgTable("auth_sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const authVerificationTokens = pgTable(
  "auth_verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
);

export const testimonialStatus = pgEnum("testimonial_status", ["pending", "approved", "rejected"]);

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  status: testimonialStatus("status").notNull().default("pending"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const taglines = pgTable("taglines", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  active: boolean("active").notNull().default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Inferred types
export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type SocialLink = typeof socialLinks.$inferSelect;
export type NewSocialLink = typeof socialLinks.$inferInsert;
export type FundingLink = typeof fundingLinks.$inferSelect;
export type NewFundingLink = typeof fundingLinks.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type Tagline = typeof taglines.$inferSelect;
export type NewTagline = typeof taglines.$inferInsert;
