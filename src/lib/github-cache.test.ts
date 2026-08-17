import { beforeEach, describe, expect, it, vi } from "vitest";

// --- Mock the DB client ---
// Factories must not reference outer variables (they are hoisted).
// We use vi.hoisted() to create the fns before hoisting runs.
const { mockSelect, mockFrom, mockWhere, mockInsert, mockValues, mockOnConflictDoUpdate } =
  vi.hoisted(() => ({
    mockSelect: vi.fn(),
    mockFrom: vi.fn(),
    mockWhere: vi.fn(),
    mockInsert: vi.fn(),
    mockValues: vi.fn(),
    mockOnConflictDoUpdate: vi.fn(),
  }));

vi.mock("@/db/client", () => ({
  db: {
    select: mockSelect,
    insert: mockInsert,
  },
}));

// --- Mock getRepo from github.ts ---
const { mockGetRepo, mockGetReadme } = vi.hoisted(() => ({
  mockGetRepo: vi.fn(),
  mockGetReadme: vi.fn(),
}));
vi.mock("@/lib/github", () => ({ getRepo: mockGetRepo, getReadme: mockGetReadme }));

// Import AFTER mocks are set up
import { getCachedRepoData } from "./github-cache";

// Helper: build a cache row
function cacheRow(
  repoName: string,
  stars: number,
  ageMs: number,
  readmeExcerpt: string | null = "",
) {
  return {
    repo: repoName,
    stars,
    forks: 0,
    language: "TypeScript",
    description: `${repoName} desc`,
    homepage: null,
    readmeExcerpt,
    fetchedAt: new Date(Date.now() - ageMs),
  };
}

// Helper: build a GithubRepo fixture
function githubRepo(name: string, stars: number) {
  return {
    name,
    full_name: `nixrajput/${name}`,
    html_url: `https://github.com/nixrajput/${name}`,
    description: `${name} live desc`,
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

// Helper: configure mockSelect to return given rows
function mockDbSelect(rows: ReturnType<typeof cacheRow>[]) {
  mockWhere.mockResolvedValue(rows);
  mockFrom.mockReturnValue({ where: mockWhere });
  mockSelect.mockReturnValue({ from: mockFrom });
}

// Helper: configure mockInsert for upsert chain
function setupMockInsert() {
  mockOnConflictDoUpdate.mockResolvedValue([]);
  mockValues.mockReturnValue({ onConflictDoUpdate: mockOnConflictDoUpdate });
  mockInsert.mockReturnValue({ values: mockValues });
}

beforeEach(() => {
  vi.clearAllMocks();
  setupMockInsert();
  mockGetReadme.mockResolvedValue("# repo\n\nSome prose.");
});

const TWENTY_THREE_HOURS = 23 * 60 * 60 * 1000;
const TWENTY_FIVE_HOURS = 25 * 60 * 60 * 1000;

describe("getCachedRepoData", () => {
  it("returns cached data for fresh rows (<24h) without calling getRepo", async () => {
    const freshRow = cacheRow("my-repo", 50, TWENTY_THREE_HOURS);
    mockDbSelect([freshRow]);

    const result = await getCachedRepoData(["nixrajput/my-repo"]);

    expect(mockGetRepo).not.toHaveBeenCalled();
    expect(result.get("nixrajput/my-repo")?.stars).toBe(50);
  });

  it("refreshes a FRESH row whose excerpt is NULL, backfilling rows that predate the column", async () => {
    // The prod case: the column was added while existing rows were still inside their 24h
    // window, so without this they would render blank until the TTL happened to roll.
    mockDbSelect([cacheRow("my-repo", 50, TWENTY_THREE_HOURS, null)]);
    mockGetRepo.mockResolvedValue(githubRepo("my-repo", 50));

    const result = await getCachedRepoData(["nixrajput/my-repo"]);

    expect(mockGetRepo).toHaveBeenCalled();
    expect(result.get("nixrajput/my-repo")?.readmeExcerpt).toBe("repo Some prose.");
  });

  it("does NOT refresh a fresh row whose excerpt is an empty string", async () => {
    // "" means "checked, this repo has no README". Treating it as incomplete would refetch on
    // every regeneration forever.
    mockDbSelect([cacheRow("no-readme", 3, TWENTY_THREE_HOURS, "")]);

    await getCachedRepoData(["nixrajput/no-readme"]);

    expect(mockGetRepo).not.toHaveBeenCalled();
  });

  it("stores an empty string, never NULL, when the repo has no README", async () => {
    mockDbSelect([cacheRow("no-readme", 3, TWENTY_FIVE_HOURS, null)]);
    mockGetRepo.mockResolvedValue(githubRepo("no-readme", 3));
    mockGetReadme.mockResolvedValue(null);

    await getCachedRepoData(["nixrajput/no-readme"]);

    expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({ readmeExcerpt: "" }));
  });

  it("stores an empty string when the README fetch throws, so it cannot loop", async () => {
    // NULL is the refresh trigger, so writing NULL here would refetch every regeneration for
    // as long as GitHub stayed unavailable.
    mockDbSelect([cacheRow("rate-limited", 7, TWENTY_FIVE_HOURS, null)]);
    mockGetRepo.mockResolvedValue(githubRepo("rate-limited", 7));
    mockGetReadme.mockRejectedValue(new Error("403 rate limited"));

    await getCachedRepoData(["nixrajput/rate-limited"]);

    expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({ readmeExcerpt: "" }));
  });

  it("fetches from GitHub and upserts for stale rows (>24h)", async () => {
    const staleRow = cacheRow("my-repo", 5, TWENTY_FIVE_HOURS);
    mockDbSelect([staleRow]);
    mockGetRepo.mockResolvedValue(githubRepo("my-repo", 120));

    const result = await getCachedRepoData(["nixrajput/my-repo"]);

    expect(mockGetRepo).toHaveBeenCalledWith("nixrajput/my-repo");
    expect(mockInsert).toHaveBeenCalled();
    expect(result.get("nixrajput/my-repo")?.stars).toBe(120);
  });

  it("fetches from GitHub for missing rows (no cache)", async () => {
    mockDbSelect([]);
    mockGetRepo.mockResolvedValue(githubRepo("new-repo", 99));

    const result = await getCachedRepoData(["nixrajput/new-repo"]);

    expect(mockGetRepo).toHaveBeenCalledWith("nixrajput/new-repo");
    expect(result.get("nixrajput/new-repo")?.stars).toBe(99);
  });

  it("falls back to stale cache when GitHub fetch throws (resilience)", async () => {
    const staleRow = cacheRow("my-repo", 77, TWENTY_FIVE_HOURS);
    mockDbSelect([staleRow]);
    mockGetRepo.mockRejectedValue(new Error("rate limited"));

    const result = await getCachedRepoData(["nixrajput/my-repo"]);

    // Must NOT re-throw; must return the stale cached value
    expect(result.get("nixrajput/my-repo")?.stars).toBe(77);
    // Must NOT upsert since fetch failed
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("falls back to zero stats when GitHub fails and no cache exists", async () => {
    mockDbSelect([]);
    mockGetRepo.mockRejectedValue(new Error("network error"));

    const result = await getCachedRepoData(["nixrajput/ghost-repo"]);

    const stats = result.get("nixrajput/ghost-repo");
    expect(stats?.stars).toBe(0);
    expect(stats?.language).toBeNull();
  });

  it("processes multiple slugs, fetching only stale ones", async () => {
    const freshRow = cacheRow("fresh-repo", 10, TWENTY_THREE_HOURS);
    const staleRow = cacheRow("stale-repo", 5, TWENTY_FIVE_HOURS);
    mockDbSelect([freshRow, staleRow]);
    mockGetRepo.mockResolvedValue(githubRepo("stale-repo", 200));

    await getCachedRepoData(["nixrajput/fresh-repo", "nixrajput/stale-repo"]);

    // Only the stale one gets fetched
    expect(mockGetRepo).toHaveBeenCalledTimes(1);
    expect(mockGetRepo).toHaveBeenCalledWith("nixrajput/stale-repo");
  });
});
