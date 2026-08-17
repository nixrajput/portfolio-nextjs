/** Server-side config with no hardcoded fallback, so a misconfiguration fails loudly. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Throws on the server but returns "" on the client: throwing at module-eval time in the
 * browser crashes hydration and takes the whole page down via the error boundary. A correct
 * build always inlines the real value, so the empty string only ever guards a misbuilt chunk.
 */
export function requirePublicEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    if (typeof window === "undefined") {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return "";
  }
  return value;
}
