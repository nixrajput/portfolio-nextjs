import { revalidatePath, revalidateTag } from "next/cache";

/** Refresh the homepage and live-GitHub cache after content edits. */
export function revalidatePortfolio(): void {
  revalidatePath("/");
  // Next 16: revalidateTag requires a cacheLife profile as the 2nd arg.
  revalidateTag("github", "max");
}
