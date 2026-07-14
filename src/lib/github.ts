import {
  githubRepoListSchema,
  githubRepoSchema,
  githubUserStatsSchema,
  type GithubRepo,
} from "./schemas";

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 3600;

function authHeaders(): HeadersInit {
  // Server-only token (NOT NEXT_PUBLIC_*) — this code never runs on the client,
  // so the token is never bundled into the browser. Used only to raise GitHub's
  // anonymous rate limit (60/hr) to the authenticated 5,000/hr for public reads.
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export type GithubUserStats = {
  followers: number;
  publicRepos: number;
  totalStars: number;
  firstContributionYear: number | null;
};

// Single GraphQL query for all account-level stats: followers, owned public
// non-fork repo count + their stargazer sum, and the years the user contributed
// in (the earliest is the first year they built on GitHub). GraphQL requires a
// token; without one the request 401s and the caller falls back to the cache.
const USER_STATS_QUERY = `query($login:String!){
  user(login:$login){
    followers{totalCount}
    repositories(privacy:PUBLIC ownerAffiliations:OWNER isFork:false first:100){
      totalCount
      nodes{stargazerCount}
    }
    contributionsCollection{contributionYears}
  }
}`;

/** Fetch account-level stats via the GraphQL API. Returns null if the user is
 *  absent. Throws on transport/schema errors so the caller can fall back. */
export async function getUserStats(username: string): Promise<GithubUserStats | null> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ query: USER_STATS_QUERY, variables: { login: username } }),
    next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
  });
  if (!res.ok) throw new Error(`GitHub getUserStats ${username} failed: ${res.status}`);
  const parsed = githubUserStatsSchema.parse(await res.json());
  const user = parsed.data.user;
  if (!user) return null;

  const years = user.contributionsCollection.contributionYears;
  return {
    followers: user.followers.totalCount,
    publicRepos: user.repositories.totalCount,
    totalStars: user.repositories.nodes.reduce((sum, r) => sum + r.stargazerCount, 0),
    firstContributionYear: years.length > 0 ? Math.min(...years) : null,
  };
}

/** Fetch a single repo by "owner/name". Returns null on 404. Throws on bad schema. */
export async function getRepo(slug: string): Promise<GithubRepo | null> {
  const res = await fetch(`${GITHUB_API}/repos/${slug}`, {
    headers: authHeaders(),
    next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getRepo ${slug} failed: ${res.status}`);
  return githubRepoSchema.parse(await res.json());
}

/** List a user's public repos (paginated, 100/page, sorted by pushed). */
export async function listUserRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=pushed&type=owner`,
    {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
    },
  );
  if (!res.ok) throw new Error(`GitHub listUserRepos ${username} failed: ${res.status}`);
  return githubRepoListSchema.parse(await res.json());
}
