import { inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { githubCache } from "@/db/schema";
import type { GithubCache } from "@/db/schema";
import { getRepo } from "@/lib/github";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export type CachedRepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  homepage: string | null;
  htmlUrl: string | null;
};

function isStale(row: GithubCache): boolean {
  return Date.now() - row.fetchedAt.getTime() > CACHE_TTL_MS;
}

function slugToRepoName(slug: string): string {
  // slug is "owner/repo" — the DB stores only the repo name part
  return slug.includes("/") ? (slug.split("/").pop() ?? slug) : slug;
}

function rowToStats(row: GithubCache, slug: string): CachedRepoStats {
  return {
    stars: row.stars,
    forks: row.forks,
    language: row.language,
    description: row.description,
    homepage: row.homepage,
    htmlUrl: `https://github.com/${slug}`,
  };
}

function nullStats(slug: string): CachedRepoStats {
  return {
    stars: 0,
    forks: 0,
    language: null,
    description: null,
    homepage: null,
    htmlUrl: `https://github.com/${slug}`,
  };
}

/**
 * Reads github_cache for the given "owner/repo" slugs.
 * Missing or stale (>24h) rows are fetched from GitHub and upserted.
 * On fetch failure, falls back to existing cache row; if no cache, returns zero stats.
 * Never throws — resilient to GitHub rate limits and network errors.
 */
export async function getCachedRepoData(slugs: string[]): Promise<Map<string, CachedRepoStats>> {
  const result = new Map<string, CachedRepoStats>();

  if (slugs.length === 0) return result;

  // Map slug → repoName (what's stored in DB as PK)
  const slugToName = new Map(slugs.map((s) => [s, slugToRepoName(s)]));
  const repoNames = [...slugToName.values()];

  // Read all cached rows for these repo names in one query
  const cachedRows = await db
    .select()
    .from(githubCache)
    .where(inArray(githubCache.repo, repoNames));

  const cacheByName = new Map(cachedRows.map((r) => [r.repo, r]));

  // Process each slug: refresh if missing or stale
  await Promise.all(
    slugs.map(async (slug) => {
      const repoName = slugToName.get(slug)!;
      const cached = cacheByName.get(repoName);

      const needsRefresh = !cached || isStale(cached);

      if (!needsRefresh) {
        // Fresh cache — serve directly
        result.set(slug, rowToStats(cached!, slug));
        return;
      }

      // Attempt live fetch from GitHub
      try {
        const live = await getRepo(slug);
        if (live) {
          const upsertRow = {
            repo: repoName,
            stars: live.stargazers_count,
            forks: live.forks_count,
            language: live.language,
            description: live.description,
            homepage: live.homepage,
            fetchedAt: new Date(),
          };
          await db
            .insert(githubCache)
            .values(upsertRow)
            .onConflictDoUpdate({
              target: githubCache.repo,
              set: {
                stars: upsertRow.stars,
                forks: upsertRow.forks,
                language: upsertRow.language,
                description: upsertRow.description,
                homepage: upsertRow.homepage,
                fetchedAt: upsertRow.fetchedAt,
              },
            });
          result.set(slug, {
            stars: live.stargazers_count,
            forks: live.forks_count,
            language: live.language,
            description: live.description,
            homepage: live.homepage,
            htmlUrl: live.html_url,
          });
        } else {
          // 404 from GitHub — fall back to existing cache or zero stats
          result.set(slug, cached ? rowToStats(cached, slug) : nullStats(slug));
        }
      } catch {
        // Fetch failed — fall back to stale cache or zero stats; never throw
        result.set(slug, cached ? rowToStats(cached, slug) : nullStats(slug));
      }
    }),
  );

  return result;
}
