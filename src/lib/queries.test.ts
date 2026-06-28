import { describe, expect, it, vi } from "vitest";

// ── Hoist mock state so vi.mock factories can reference it ────────────────────

const { _getRows, _setRows, selectMock, chainFrom } = vi.hoisted(() => {
  let rows: unknown[] = [];

  const chainFrom = {
    orderBy: vi.fn().mockImplementation(() => Promise.resolve(rows)),
  };

  // db.select().from(table) — returns a thenable for `await db.select().from(profile)`
  const fromMock = vi.fn().mockImplementation(() => ({
    ...chainFrom,
    // make the result directly awaitable (no .orderBy) for getProfile path
    then: (resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) =>
      Promise.resolve(rows).then(resolve, reject),
  }));

  const selectMock = vi.fn().mockReturnValue({ from: fromMock });

  return {
    _getRows: () => rows,
    _setRows: (r: unknown[]) => {
      rows = r;
      chainFrom.orderBy.mockImplementation(() => Promise.resolve(rows));
      fromMock.mockImplementation(() => ({
        ...chainFrom,
        then: (resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) =>
          Promise.resolve(rows).then(resolve, reject),
      }));
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

// ── Import after mocks are registered ────────────────────────────────────────

import {
  getProfile,
  getProjectsMerged,
  getExperiences,
  getSkills,
  getServices,
  getSocialLinks,
  getFundingLinks,
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
        icon: null,
        order: 2,
        id: 2,
      },
      {
        platform: "github",
        url: "https://github.com/b",
        username: "b",
        icon: null,
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
        icon: null,
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
  it("shapes profile row reading roles/availableForWork from dedicated columns", async () => {
    _setRows([
      {
        id: 1,
        name: "Nikhil Rajput",
        headline: "Full Stack Developer",
        bio: "Bio text",
        summary: "Summary",
        stats: { years: 4, repos: 60, stars: 1200 },
        roles: ["Developer", "Designer"],
        availableForWork: true,
        resumeUrl: "/resume.pdf",
        avatarUrl: "/avatar.jpg",
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.name).toBe("Nikhil Rajput");
    expect(result.headline).toBe("Full Stack Developer");
    expect(result.bio).toBe("Bio text");
    expect(result.avatarUrl).toBe("/avatar.jpg");
    expect(result.resumeUrl).toBe("/resume.pdf");
    expect(result.roles).toEqual(["Developer", "Designer"]);
    expect(result.availableForWork).toBe(true);
    expect(result.stats).toEqual({ years: 4, repos: 60, stars: 1200 });
  });

  it("returns empty roles and availableForWork from column defaults", async () => {
    _setRows([
      {
        id: 1,
        name: "Test",
        headline: "Test headline",
        bio: "Bio",
        summary: "Summary",
        stats: {},
        roles: [],
        availableForWork: false,
        resumeUrl: null,
        avatarUrl: null,
        updatedAt: new Date(),
      },
    ]);
    const result = await getProfile();
    expect(result.roles).toEqual([]);
    expect(result.availableForWork).toBe(false);
    expect(result.avatarUrl).toBe("");
    expect(result.resumeUrl).toBe("");
    expect(result.stats).toEqual({ years: 0, repos: 0, stars: 0 });
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
        icons: [],
        order: 0,
      },
    ]);
    const result = await getServices();
    expect(result[0].title).toBe("Web Dev");
  });
});

// Suppress unused variable lint warning
void _getRows;
void chainFrom;
