/**
 * Read a required environment variable, throwing a descriptive error when it
 * is missing or empty. Use this for SERVER-side config that must come from the
 * environment with no hardcoded fallback (e.g. the email from-address) so a
 * misconfiguration fails loudly instead of silently shipping a wrong value.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Read a required `NEXT_PUBLIC_*` variable that is also evaluated in the browser
 * bundle (Next inlines it at build time). On the server we fail fast on a
 * missing value so a misconfigured build is caught loudly. On the client we
 * must NOT throw at module-eval time — that would crash hydration and take the
 * whole page down via the error boundary; we return an empty string instead
 * (a correct build always inlines the real value, so this only guards against a
 * misbuilt client chunk rather than masking real config errors).
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
