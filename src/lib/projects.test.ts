import { describe, expect, it, vi } from "vitest";

// Mock DB client so the module can be imported without DATABASE_URL set
vi.mock("@/db/client", () => ({ db: {} }));

import { mergeProjects } from "./projects";
import type { Project } from "@/db/schema";
import type { GithubRepo } from "@/lib/schemas";

function repo(name: string, stars: number): GithubRepo {
  return {
    name,
    full_name: `nixrajput/${name}`,
    html_url: `https://github.com/nixrajput/${name}`,
    description: `${name} desc`,
    homepage: null,
    language: "TypeScript",
    stargazers_count: stars,
    forks_count: 0,
    open_issues_count: 0,
    topics: [],
    fork: false,
    archived: false,
    pushed_at: "2026-01-01T00:00:00Z",
  };
}

function curation(p: Partial<Project> & { repo: string }): Project {
  return {
    id: 0,
    title: p.repo,
    customBlurb: null,
    tags: [],
    featured: false,
    order: 0,
    hidden: false,
    ...p,
  } as Project;
}

describe("mergeProjects", () => {
  it("drops hidden rows", () => {
    const out = mergeProjects(
      [curation({ repo: "a", hidden: true }), curation({ repo: "b" })],
      [repo("a", 1), repo("b", 1)],
    );
    expect(out.map((p) => p.repo)).toEqual(["b"]);
  });

  it("sorts featured first, then by order, then by stars desc", () => {
    const out = mergeProjects(
      [
        curation({ repo: "plain", featured: false, order: 0 }),
        curation({ repo: "feat-b", featured: true, order: 2 }),
        curation({ repo: "feat-a", featured: true, order: 1 }),
      ],
      [repo("plain", 100), repo("feat-a", 5), repo("feat-b", 5)],
    );
    expect(out.map((p) => p.repo)).toEqual(["feat-a", "feat-b", "plain"]);
  });

  it("ties on featured+order break by stars desc", () => {
    const out = mergeProjects(
      [curation({ repo: "low", order: 0 }), curation({ repo: "high", order: 0 })],
      [repo("low", 1), repo("high", 99)],
    );
    expect(out.map((p) => p.repo)).toEqual(["high", "low"]);
  });

  it("prefers customBlurb over github description, falls back when null", () => {
    const out = mergeProjects(
      [curation({ repo: "a", customBlurb: "Custom" }), curation({ repo: "b" })],
      [repo("a", 0), repo("b", 0)],
    );
    expect(out.find((p) => p.repo === "a")?.description).toBe("Custom");
    expect(out.find((p) => p.repo === "b")?.description).toBe("b desc");
  });

  it("yields null live stats when the repo is missing from github", () => {
    const out = mergeProjects([curation({ repo: "ghost" })], []);
    expect(out[0].stars).toBeNull();
    expect(out[0].language).toBeNull();
  });
});
