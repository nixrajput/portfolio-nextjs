import { requireEnv } from "@/lib/env";

export const SITE = {
  // Canonical production origin (https://nixrajput.com), env-driven with no
  // hardcoded fallback — a missing value fails the build loudly rather than
  // silently emitting the wrong domain across SEO, OG, JSON-LD, and sitemaps.
  url: requireEnv("NEXT_PUBLIC_SITE_URL"),
  name: "Nikhil Rajput",
  title: "Nikhil Rajput — Software Engineer & AI Lead",
  description:
    "Nikhil Rajput is a Software Development Engineer and AI Lead from India who builds fast, reliable web and mobile products across modern front-end and back-end stacks.",
  handle: "@nixrajput07",
  sameAs: [
    "https://github.com/nixrajput",
    "https://www.linkedin.com/in/nixrajput",
    "https://twitter.com/nixrajput07",
    "https://www.instagram.com/nixrajput",
  ],
} as const;
