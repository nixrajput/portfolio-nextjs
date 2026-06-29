/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
