/**
 * Pure admin gate: only the configured GitHub user id may sign in. A login can be renamed and then
 * claimed by someone else; the numeric id cannot.
 */
export function isAdminProfile(
  profile: { id?: unknown; [field: string]: unknown } | null | undefined,
  adminId: string | undefined,
): boolean {
  const id = profile?.id;
  if ((typeof id !== "number" && typeof id !== "string") || !adminId?.trim()) return false;
  return String(id) === adminId.trim();
}
