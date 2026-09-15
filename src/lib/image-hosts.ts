// Mirrors the hostnames in next.config.js `images.remotePatterns` by hand, because a Next config
// is not safely importable into runtime app code. image-hosts.test.ts derives its expectations
// from that config, so the two cannot drift - the same guard brand.ts uses against globals.css.
const ALLOWED_PATTERNS = [
  "**.githubusercontent.com",
  "**.github.com",
  "**.amazonaws.com",
  "**.public.blob.vercel-storage.com",
  "nixrajput.com",
  "**.nixrajput.com",
] as const;

function hostMatches(hostname: string, pattern: string): boolean {
  if (pattern.startsWith("**.")) {
    const base = pattern.slice(3);
    return hostname === base || hostname.endsWith(`.${base}`);
  }
  return hostname === pattern;
}

/**
 * Whether next/image will actually serve this URL. An admin can paste any https URL, and an
 * unlisted host renders fine in the `unoptimized` admin preview while the public page shows nothing.
 */
export function isAllowedImageHost(url: string): boolean {
  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return false;
  }
  return ALLOWED_PATTERNS.some((p) => hostMatches(hostname, p));
}

export const ALLOWED_IMAGE_HOST_PATTERNS = ALLOWED_PATTERNS;
