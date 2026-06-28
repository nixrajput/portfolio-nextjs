import { db } from "@/db/client";
import { projects } from "@/db/schema";
import { getCachedRepoData } from "@/lib/github-cache";

const rows = await db.select().from(projects);
const slugs = rows.map((r: { repo: string }) => "nixrajput/" + r.repo);
console.log("Repos to cache:", slugs.length);
const result = await getCachedRepoData(slugs);
const sorted = [...result.entries()].sort((a, b) => b[1].stars - a[1].stars);
for (const [slug, stats] of sorted) {
  console.log(slug.padEnd(60), "stars:", stats.stars, "| lang:", stats.language ?? "null");
}
process.exit(0);
