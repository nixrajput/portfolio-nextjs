/** Pure admin gate: only the configured GitHub login may sign in. */
export function isAllowedLogin(
  login: string | null | undefined,
  adminLogin: string | undefined,
): boolean {
  if (!login || !adminLogin) return false;
  return login.toLowerCase() === adminLogin.toLowerCase();
}
