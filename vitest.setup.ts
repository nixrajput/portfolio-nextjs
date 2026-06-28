import "@testing-library/jest-dom/vitest";

// Required env for modules that read it at import time (e.g. SITE.url via
// requireEnv). Set a stable test value so importing route/SEO modules in tests
// never throws on a missing variable.
process.env.NEXT_PUBLIC_SITE_URL ??= "https://nixrajput.com";
