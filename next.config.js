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

// Scripts keep 'unsafe-inline': a nonce needs per-request rendering, which the ISR homepage does
// not do. The inline scripts are the theme pre-paint, the palette, gtag init and Next's own.
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  // https: because the admin previews any pasted image URL before it is saved.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  // github.com: the no-JS sign-in form posts here and is redirected to GitHub OAuth.
  "form-action 'self' https://github.com",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
    // 90 for the About portrait: it renders large enough that the default 75 shows artefacts.
    qualities: [75, 90],
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
