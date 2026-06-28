/**
 * Read a required environment variable, throwing a descriptive error when it
 * is missing or empty. Use this for config that must come from the environment
 * with no hardcoded fallback (e.g. the public site URL, the email from-address)
 * so a misconfiguration fails loudly instead of silently shipping a wrong value.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
