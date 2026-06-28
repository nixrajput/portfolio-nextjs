import { requirePublicEnv } from "@/lib/env";

export const SITE = {
  // Canonical production origin (https://nixrajput.com), env-driven with no
  // hardcoded fallback. Fails the build loudly on the server if missing; on the
  // client it never throws (would crash hydration) since Next inlines the value.
  url: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
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
