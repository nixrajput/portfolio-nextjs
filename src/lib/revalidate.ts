import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Does NOT force fresh GitHub numbers despite the tag: the cache helpers check the Postgres
 * row's `fetchedAt` before attempting a fetch, so a row under the 24h TTL returns early and
 * the invalidated fetch cache is never reached.
 */
export function revalidatePortfolio(): void {
  revalidatePath("/");
  // Next 16: revalidateTag requires a cacheLife profile as the 2nd arg.
  revalidateTag("github", "max");
}
