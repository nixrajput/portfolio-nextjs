/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sharp is a native addon used server-side (testimonial/avatar image
  // optimization in src/lib/blob.ts). Mark it external so Next loads it via a
  // plain require from node_modules at runtime instead of letting Turbopack
  // rewrite it into a hashed external module it cannot dlopen on Vercel
  // (see vercel/next.js#86866).
  serverExternalPackages: ["sharp"],
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
