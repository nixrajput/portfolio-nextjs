import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Hoist mock state so vi.mock factories can reference it ────────────────────

const { _getRows, _setRows, _setPeriodRows, selectMock, chainFrom } = vi.hoisted(() => {
  let rows: unknown[] = [];
  // getProfile now makes a second select for the experience periods that back the
  // "years of experience" stat. The mock cannot tell tables apart, so that query is
  // matched on the projection instead - see selectMock below.
  let periodRows: unknown[] = [];

  function makeFromResult(result: () => unknown[]) {
    return {
      orderBy: vi.fn().mockImplementation(() => Promise.resolve(result())),
      where: vi.fn().mockImplementation(() => ({
        // getRandomTagline awaits .where() directly
        then: (resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) =>
          Promise.resolve(result()).then(resolve, reject),
      })),
      // make the result directly awaitable (no .orderBy) for getProfile path
      then: (resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) =>
        Promise.resolve(result()).then(resolve, reject),
    };
  }

  const chainFrom = {
    orderBy: vi.fn().mockImplementation(() => Promise.resolve(rows)),
  };

  // db.select() with no projection returns the row set; db.select({ period }) is the
  // experience-periods read, so it gets the period rows.
  const selectMock = vi.fn().mockImplementation((projection?: Record<string, unknown>) => {
    const isPeriodQuery = projection !== undefined && "period" in projection;
    return { from: vi.fn(() => makeFromResult(() => (isPeriodQuery ? periodRows : rows))) };
  });

  return {
    _getRows: () => rows,
    _setRows: (r: unknown[]) => {
      rows = r;
      chainFrom.orderBy.mockImplementation(() => Promise.resolve(rows));
    },
    _setPeriodRows: (r: unknown[]) => {
      periodRows = r;
    },
    selectMock,
    chainFrom,
  };
});

// ── Mock the DB client before importing the module under test ─────────────────

vi.mock("@/db/client", () => ({
  db: { select: selectMock },
}));

// Also mock the projects module so getProjectsMerged doesn't hit GitHub/DB.
vi.mock("@/lib/projects", () => ({
  getProjects: vi.fn().mockResolvedValue([{ repo: "a", featured: true, hidden: false }]),
}));

// Mock the GitHub user cache so getProfile's live account-stats read stays offline.
const { getCachedUserStatsMock } = vi.hoisted(() => ({ getCachedUserStatsMock: vi.fn() }));
vi.mock("@/lib/github-cache", () => ({ getCachedUserStats: getCachedUserStatsMock }));

// ── Import after mocks are registered ────────────────────────────────────────

import {
  getProfile,
  getProjectsMerged,
  getExperiences,
  getSkills,
  getServices,
  getSocialLinks,
  getFundingLinks,
  getRandomTagline,
} from "./queries";

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("getProjectsMerged", () => {
  it("delegates to getProjects from projects.ts", async () => {
    const result = await getProjectsMerged();
    expect(result).toEqual([{ repo: "a", featured: true, hidden: false }]);
  });
});

describe("getSocialLinks", () => {
  it("returns rows mapped to SocialRow shape", async () => {
    _setRows([
      {
        platform: "twitter",
        url: "https://twitter.com/a",
        username: "a",
        order: 2,
        id: 2,
      },
      {
        platform: "github",
        url: "https://github.com/b",
        username: "b",
        order: 1,
        id: 1,
      },
    ]);
    const result = await getSocialLinks();
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      platform: "twitter",
      url: "https://twitter.com/a",
      username: "a",
      order: 2,
    });
    expect(result[1]).toEqual({
      platform: "github",
      url: "https://github.com/b",
      username: "b",
      order: 1,
    });
  });

  it("defaults username to empty string when null", async () => {
    _setRows([
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/x",
        username: null,
        order: 0,
        id: 1,
      },
    ]);
    const result = await getSocialLinks();
    expect(result[0].username).toBe("");
  });
});

describe("getFundingLinks", () => {
  it("maps rows to FundingRow shape", async () => {
    _setRows([
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors/x",
        primary: true,
        order: 0,
        id: 1,
      },
      {
        label: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/x",
        primary: false,
        order: 1,
        id: 2,
      },
    ]);
    const result = await getFundingLinks();
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      label: "GitHub Sponsors",
      url: "https://github.com/sponsors/x",
      primary: true,
      order: 0,
    });
    expect(result[1]).toEqual({
      label: "Buy Me a Coffee",
      url: "https://buymeacoffee.com/x",
      primary: false,
      order: 1,
    });
  });

  it("preserves primary flag from DB rows", async () => {
    _setRows([{ label: "Patreon", url: "https://patreon.com/x", primary: false, order: 0, id: 1 }]);
    const result = await getFundingLinks();
    expect(result[0].primary).toBe(false);
  });
});

describe("getProfile", () => {
  // Pin "now" so the derived years figure is deterministic.
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date("2026-01-01T00:00:00Z"));
    // Earliest start 2021 → 5 years of professional experience at the pinned date.
    _setPeriodRows([{ period: "Jul 2024 – Present" }, { period: "May 2021 – Jul 2022" }]);
  });
  afterEach(() => vi.useRealTimers());

  it("shapes profile row deriving GitHub stats from the user cache", async () => {
    getCachedUserStatsMock.mockResolvedValue({
      followers: 112,
      publicRepos: 72,
      totalStars: 340,
      // Deliberately different from the experience-derived figure: years must NOT come
      // from GitHub any more, so a 2018 account cannot produce 8 here.
      firstContributionYear: 2018,
    });
    _setRows([
      {
        id: 1,
        name: "Nikhil Rajput",
        bio: "Bio text",
        stats: { years: 4, repos: 60, stars: 1200 },
        roles: ["Developer", "Designer"],
        resumeUrl: "/resume.pdf",
        avatarUrl: "/avatar.jpg",
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.name).toBe("Nikhil Rajput");
    expect(result.roles).toEqual(["Developer", "Designer"]);
    // repos/stars/followers from the live cache; years from the experience rows.
    expect(result.stats).toEqual({ years: 5, repos: 72, stars: 340, followers: 112 });
  });

  it("returns empty roles and defaults from column defaults", async () => {
    getCachedUserStatsMock.mockResolvedValue({
      followers: 5,
      publicRepos: 9,
      totalStars: 11,
      firstContributionYear: 2024,
    });
    _setRows([
      {
        id: 1,
        name: "Test",
        bio: "Bio",
        stats: {},
        roles: [],
        resumeUrl: null,
        avatarUrl: null,
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.roles).toEqual([]);
    // A missing avatar falls back to the bundled asset so the hero never breaks.
    expect(result.avatarUrl).toBe("/images/nikhil.png");
    expect(result.resumeUrl).toBe("");
    expect(result.stats).toEqual({ years: 5, repos: 9, stars: 11, followers: 5 });
  });

  it("falls back to the seeded GitHub stats when the cache is empty, but keeps derived years", async () => {
    // Cold cache + failed fetch → getCachedUserStats returns null. Years is unaffected
    // because it no longer comes from GitHub at all.
    getCachedUserStatsMock.mockResolvedValue(null);
    _setRows([
      {
        id: 1,
        name: "Test",
        bio: "Bio",
        stats: { years: 4, repos: 60, stars: 250, followers: 42 },
        roles: [],
        resumeUrl: null,
        avatarUrl: null,
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.stats).toEqual({ years: 5, repos: 60, stars: 250, followers: 42 });
  });

  it("falls back to the seeded years only when no experience row yields a start year", async () => {
    getCachedUserStatsMock.mockResolvedValue(null);
    _setPeriodRows([{ period: "Present" }]);
    _setRows([
      {
        id: 1,
        name: "Test",
        bio: "Bio",
        stats: { years: 4, repos: 60, stars: 250, followers: 42 },
        roles: [],
        resumeUrl: null,
        avatarUrl: null,
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.stats.years).toBe(4);
  });

  it("throws when profile row is missing", async () => {
    _setRows([]);
    await expect(getProfile()).rejects.toThrow("Profile row not found");
  });
});

describe("getExperiences", () => {
  it("returns experience rows from DB", async () => {
    _setRows([
      {
        id: 1,
        role: "Engineer",
        org: "Acme",
        period: "2020–2023",
        location: "Remote",
        isCurrent: false,
        description: ["Did things"],
        order: 0,
      },
    ]);
    const result = await getExperiences();
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("Engineer");
  });
});

describe("getSkills", () => {
  it("returns skill rows from DB", async () => {
    _setRows([
      {
        id: 1,
        name: "TypeScript",
        iconPath: "/ts.svg",
        category: "Language",
        level: "Expert",
        order: 0,
      },
    ]);
    const result = await getSkills();
    expect(result[0].name).toBe("TypeScript");
  });
});

describe("getServices", () => {
  it("returns service rows from DB", async () => {
    _setRows([
      {
        id: 1,
        title: "Web Dev",
        description: "Build apps",
        shortDescription: null,
        icon: null,
        order: 0,
      },
    ]);
    const result = await getServices();
    expect(result[0].title).toBe("Web Dev");
  });
});

describe("getRandomTagline", () => {
  it("returns text of a random active tagline", async () => {
    _setRows([
      { id: "abc", text: "Rise above limits", active: true, order: 0, created_at: new Date() },
    ]);
    const result = await getRandomTagline();
    expect(result).toBe("Rise above limits");
  });

  it("returns fallback when no active taglines exist", async () => {
    _setRows([]);
    const result = await getRandomTagline();
    expect(result).toBe("Rise above limits");
  });

  it("returns one of the texts when multiple taglines exist", async () => {
    const taglineTexts = ["Rise above limits", "Think, build, and ship"];
    _setRows(
      taglineTexts.map((text, i) => ({
        id: String(i),
        text,
        active: true,
        order: i,
        created_at: new Date(),
      })),
    );
    const result = await getRandomTagline();
    expect(taglineTexts).toContain(result);
  });
});

// Suppress unused variable lint warning
void _getRows;
void chainFrom;
