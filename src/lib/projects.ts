import { db } from "@/db/client";
import { projects as projectsTable, type Project } from "@/db/schema";
import { listUserRepos } from "@/lib/github";
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

/** Async wrapper: read DB curation + live repos, then merge.
 *  GitHub is best-effort: rate-limits or network errors return DB-only data
 *  with null stats so the section still renders at build time. */
export async function getProjects(): Promise<MergedProject[]> {
  const [curation, repos] = await Promise.all([
    db.select().from(projectsTable),
    listUserRepos("nixrajput").catch(() => [] as GithubRepo[]),
  ]);
  return mergeProjects(curation, repos);
}
