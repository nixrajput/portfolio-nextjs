import { eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { githubCache, githubUserCache } from "@/db/schema";
import type { GithubCache, GithubUserCache } from "@/db/schema";
import { getReadme, getRepo, getUserStats } from "@/lib/github";
import { toExcerpt } from "@/lib/readme";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export type CachedRepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  homepage: string | null;
  htmlUrl: string | null;
  readmeExcerpt: string | null;
};

function isStale(row: { fetchedAt: Date }): boolean {
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
    readmeExcerpt: row.readmeExcerpt,
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
    readmeExcerpt: null,
  };
}

/**
 * Missing or stale (>24h) rows refresh from GitHub and upsert. Never throws: a rate limit or
 * network error falls back to the existing row, so the section always renders.
 */
export async function getCachedRepoData(slugs: string[]): Promise<Map<string, CachedRepoStats>> {
  const result = new Map<string, CachedRepoStats>();

  if (slugs.length === 0) return result;

  const slugToName = new Map(slugs.map((s) => [s, slugToRepoName(s)]));
  const repoNames = [...slugToName.values()];

  const cachedRows = await db
    .select()
    .from(githubCache)
    .where(inArray(githubCache.repo, repoNames));

  const cacheByName = new Map(cachedRows.map((r) => [r.repo, r]));

  await Promise.all(
    slugs.map(async (slug) => {
      const repoName = slugToName.get(slug)!;
      const cached = cacheByName.get(repoName);

      // NULL means the row predates the readme_excerpt column, not that the repo has no
      // README (that stores ""), so refreshing on NULL is what backfills existing rows.
      const needsRefresh = !cached || isStale(cached) || cached.readmeExcerpt === null;

      if (!needsRefresh) {
        result.set(slug, rowToStats(cached!, slug));
        return;
      }

      try {
        const live = await getRepo(slug);
        if (live) {
          // Never NULL: "" records "checked, no README". Also "" on failure, because NULL is
          // the refresh trigger above and would refetch on every regeneration.
          let readmeExcerpt = cached?.readmeExcerpt ?? "";
          try {
            const markdown = await getReadme(slug);
            readmeExcerpt = markdown === null ? "" : toExcerpt(markdown);
          } catch {
            /* keep whatever we had; the next 24h refresh tries again */
          }

          const upsertRow = {
            repo: repoName,
            stars: live.stargazers_count,
            forks: live.forks_count,
            language: live.language,
            description: live.description,
            homepage: live.homepage,
            readmeExcerpt,
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
                readmeExcerpt: upsertRow.readmeExcerpt,
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
            readmeExcerpt,
          });
        } else {
          result.set(slug, cached ? rowToStats(cached, slug) : nullStats(slug));
        }
      } catch {
        result.set(slug, cached ? rowToStats(cached, slug) : nullStats(slug));
      }
    }),
  );

  return result;
}

export type CachedUserStats = {
  followers: number;
  publicRepos: number;
  totalStars: number;
  firstContributionYear: number | null;
};

function userRowToStats(row: GithubUserCache): CachedUserStats {
  return {
    followers: row.followers,
    publicRepos: row.publicRepos,
    totalStars: row.totalStars,
    firstContributionYear: row.firstContributionYear,
  };
}

/**
 * Serves the last-known-good row instantly; stale (>24h) rows refresh via one GraphQL query
 * and upsert. Never throws - a fetch failure falls back to the existing row, so only a cold
 * cache with a failed first fetch yields null.
 */
export async function getCachedUserStats(username: string): Promise<CachedUserStats | null> {
  const [cached] = await db
    .select()
    .from(githubUserCache)
    .where(eq(githubUserCache.username, username));

  if (cached && !isStale(cached)) return userRowToStats(cached);

  try {
    const live = await getUserStats(username);
    if (live) {
      const row = { username, ...live, fetchedAt: new Date() };
      await db
        .insert(githubUserCache)
        .values(row)
        .onConflictDoUpdate({
          target: githubUserCache.username,
          set: {
            followers: row.followers,
            publicRepos: row.publicRepos,
            totalStars: row.totalStars,
            firstContributionYear: row.firstContributionYear,
            fetchedAt: row.fetchedAt,
          },
        });
      return live;
    }
    return cached ? userRowToStats(cached) : null;
  } catch {
    return cached ? userRowToStats(cached) : null;
  }
}
