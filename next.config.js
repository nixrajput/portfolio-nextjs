// Canonical origin from the same env var the app uses (NEXT_PUBLIC_SITE_URL),
// so the www->apex redirect tracks one source of truth with the canonical tags,
// sitemap, robots, and JSON-LD. Parsed defensively: a missing/invalid value
// disables the redirect rather than crashing config evaluation.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
let apexHost = null;
if (siteUrl) {
  try {
    apexHost = new URL(siteUrl).host.replace(/^www\./, "");
  } catch {
    apexHost = null;
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sharp is a native addon used server-side (testimonial/avatar image
  // optimization in src/lib/blob.ts). Mark it external so Next loads it via a
  // plain require from node_modules at runtime instead of letting Turbopack
  // rewrite it into a hashed external module it cannot dlopen on Vercel
  // (see vercel/next.js#86866).
  serverExternalPackages: ["sharp"],
  // Enforce the apex (non-www) host so the www subdomain is not served/indexed
  // as a separate origin. The canonical tag is only a hint; this 308 makes the
  // apex authoritative. Skipped when NEXT_PUBLIC_SITE_URL is absent/invalid.
  async redirects() {
    if (!apexHost) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${apexHost}` }],
        destination: `https://${apexHost}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "**.github.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      // Avatar + testimonial images uploaded to Vercel Blob.
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      // The site's own domain — the seeded avatar is an absolute URL pointing
      // at a bundled /public asset on this origin.
      { protocol: "https", hostname: "nixrajput.com" },
      { protocol: "https", hostname: "**.nixrajput.com" },
    ],
  },
};

module.exports = nextConfig;
