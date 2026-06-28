import { githubRepoListSchema, githubRepoSchema, type GithubRepo } from "./schemas";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
