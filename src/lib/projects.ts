import { db } from "@/db/client";
import { projects as projectsTable, type Project } from "@/db/schema";
import { getCachedRepoData } from "@/lib/github-cache";
import type { GithubRepo } from "@/lib/schemas";

export type MergedProject = Project & {
  stars: number | null;
  forks: number | null;
  language: string | null;
  description: string | null;
  homepage: string | null;
  htmlUrl: string | null;
};

/** Pure: merge curation rows with live repos, drop hidden, sort featured-first. */
export function mergeProjects(curation: Project[], repos: GithubRepo[]): MergedProject[] {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  const merged: MergedProject[] = curation
    .filter((c) => !c.hidden)
    .map((c) => {
      const live = byName.get(c.repo.toLowerCase());
      return {
        ...c,
        stars: live ? live.stargazers_count : null,
        forks: live ? live.forks_count : null,
        language: live ? live.language : null,
        description: c.customBlurb ?? (live ? live.description : null),
        homepage: live ? live.homepage : null,
        htmlUrl: live ? live.html_url : null,
      };
    });

  return merged.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return (b.stars ?? 0) - (a.stars ?? 0);
  });
}

/** Async wrapper: read DB curation + cached GitHub stats, then merge.
 *  Cache is 24h-TTL; stale/missing rows are refreshed from GitHub.
 *  GitHub failures fall back to existing cache so the section always renders. */
export async function getProjects(): Promise<MergedProject[]> {
  const curation = await db.select().from(projectsTable);

  const OWNER = "nixrajput";
  const slugs = curation.map((c) => `${OWNER}/${c.repo}`);

  const cacheMap = await getCachedRepoData(slugs);

  // Build GithubRepo-shaped objects from cache so mergeProjects stays unchanged
  const repos: GithubRepo[] = curation.map((c) => {
    const slug = `${OWNER}/${c.repo}`;
    const stats = cacheMap.get(slug);
    return {
      name: c.repo,
      full_name: slug,
      html_url: stats?.htmlUrl ?? `https://github.com/${slug}`,
      description: stats?.description ?? null,
      homepage: stats?.homepage ?? null,
      language: stats?.language ?? null,
      stargazers_count: stats?.stars ?? 0,
      forks_count: stats?.forks ?? 0,
      open_issues_count: 0,
      topics: [],
      fork: false,
      archived: false,
      pushed_at: new Date().toISOString(),
    };
  });

  return mergeProjects(curation, repos);
}
