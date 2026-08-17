# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- **Selectable brand palettes.** Five palettes (Iris, Glacier, Ember, Verdant, Magenta) chosen from a new appearance popover in the nav, persisted in `localStorage` and applied before first paint so there is no flash. Iris is the default.
- **Appearance popover** replacing the cycling theme button: light/dark/system are all visible, so returning to "system" is one click instead of cycling past the other two.
- **Project quick view.** A modal per project with cover image, README excerpt, language/stars/forks, tags and a screenshot gallery.
- **Featured showcase and language filter** in the Projects section: leading featured projects get large cells, everything else drops into a filterable grid with per-language counts.
- **Project media in the admin panel** — a cover image and up to six ordered screenshots, uploaded to Vercel Blob through a new 1600×1000 pipeline (`uploadProjectMedia`) rather than the 128px icon path.
- **README excerpts** cached per repo (`github_cache.readme_excerpt`), stripped of badge walls, HTML logo blocks and tables of contents.
- `bun run check:routes` — asserts every route serves the right **content**, not merely a 200. Covers the homepage, metadata routes, icons and the admin auth gate.
- `bun run check:vitals` — per-route JS payload and TTFB budgets, measured against a production build. Refuses to measure a dev server or a different site.
- `bun run check:spell` — cspell over source, scripts and root markdown.
- `dependency-review`, `scorecard`, `stale` and `labeler` workflows, matching the rest of the fleet.
- Palette and theme fields on the bug-report template, and a palette checklist in the PR template: with five palettes and three theme modes a visual report is not reproducible without them.

### Changed

- **Brand palette consolidated into `src/lib/brand.ts`.** It had been hardcoded across eight files and had already drifted — `manifest.ts` and `global-error.tsx` used `#07070c` as the dark ground while `globals.css` said `#060c0e`. `globals.theme.test.ts` now derives its expectations from `brand.ts`, so the CSS mirror cannot drift silently.
- Brand tokens renamed to hue-neutral names (`--brand-deep` / `--brand-mid` / `--brand-bright`); the old `violet` / `cyan` / `pink` names had stopped being true at the Glacier rebrand.
- **Ambient background retuned per theme.** `multiply` on paper accumulates where `lighter` on a near-black ground falls off fast, so one shared alpha could only be right for one of them — light mode had become a full-viewport wash with no focal point. Alphas are now per-theme and blob radii are tighter (0.34–0.42, from 0.46–0.55).
- **Years of experience is derived from the experience rows** instead of GitHub's first-contribution year, which measured how long the account had existed and counted hobby years as professional. Label updated to "Years of experience".
- Pre-push hook extended from lint + format to lint + format + spell + typecheck + tests. The build stays in CI: it is a webpack build needing a live seeded database, and a minute-plus gate teaches people to reach for `--no-verify`.
- `AGENTS.md` rewritten: the duplicated copy of the global working-discipline rules was removed in favour of project-specific pitfalls.
- Admin dashboard now surfaces a stat for every content section (projects, experiences, skills, services, social links, funding links, FAQs, testimonials) plus a profile status and testimonial moderation breakdown.
- Extracted a shared `AdminCrudPage` so the eight content sections no longer duplicate their list/dialog scaffold.

### Fixed

- A tag duplicating a project's language rendered twice on the card ("Dart Dart" on three projects); the language chip now wins and the duplicate tag is dropped.
- Five decorative glows kept the old palette through a rebrand because they were literal `rgba()` in decimal, invisible to a hex search. They now read `--brand-*-rgb` channel lists.
- `siphon` was tagged `TypeScript`; it is a Go binary.
- `README.md` claimed the production build uses Turbopack. It uses webpack, deliberately, because Turbopack breaks `sharp` on Vercel.
- `.claude/settings.json` denied only relative `./**/.env` paths, so an absolute path was not covered; added absolute variants plus `.p12`/`.pfx`/`.cert` and `Edit(...)` rules.
- `includeCoAuthoredBy` was `true`, contradicting the repo's own `.gitmessage`, which forbids those trailers.

- **Security:** admin-managed link URLs are validated with `z.httpUrl()`, rejecting `javascript:`/`data:` schemes that could otherwise be stored and rendered as an `href`.
- **Security:** the `/api/revalidate` secret is compared in constant time, and the avatar URL in admin notification emails is HTML-escaped.
- Postgres client sets `prepare: false` so it works under transaction-mode connection poolers (e.g. Neon pooled URLs) as well as direct connections.
- A missing profile avatar falls back to a bundled asset instead of rendering a broken image.
- Migrated to Tailwind v4 CSS-variable shorthand and dropped deprecated Zod 4 APIs.

---

## [2.0.0] — 2025-01-01

Complete rebuild on Next.js 16 with a database-driven content layer, admin panel, and full CI/test suite. The v1 codebase (Next.js + Sass + static data files) is retired entirely.

### Added

- **Next.js 16 App Router** with Turbopack for dev and build.
- **React 19** throughout.
- **Tailwind CSS v4** design system replacing the old Sass setup.
- **Drizzle ORM + PostgreSQL** (via postgres-js): all portfolio content (profile, projects, experiences, skills, services, social links, taglines, funding links, testimonials) is now stored in and served from a relational database.
- **Admin panel** at `/admin` — full CRUD for all content types, protected by GitHub OAuth (Auth.js v5). Access restricted to the `ADMIN_GITHUB_LOGIN` GitHub account.
- **Testimonials feature** — public submission form with optional avatar upload to Vercel Blob, moderation queue in the admin panel, and Resend email notifications to the admin on new submissions.
- **GitHub cache** — project metadata (stars, forks, descriptions) fetched from the GitHub API server-side and revalidated hourly; enriches DB project rows without exposing the token to the client.
- **SEO / GEO** — structured metadata, Open Graph, Twitter cards, Google Search Console verification, and `robots.txt` generated from the DB profile row.
- **Vercel Analytics** and **Google Analytics** integration.
- **Vitest** unit tests with Testing Library; **Playwright** end-to-end tests.
- **CI** workflow running lint, type-check, unit tests, and Lighthouse audits on every push.
- **Pre-push git hook** (`.githooks/pre-push`) running ESLint + Prettier-check before every push.
- **Framer Motion** animations.
- **Geist** font replacing Poppins.
- **Conventional Commits** enforced via `.gitmessage` template.

### Removed

- Sentry error monitoring (not required for a personal portfolio).
- All static `data/` TypeScript files — content is now DB-driven.
- Sass / SCSS stylesheets — replaced by Tailwind CSS v4.
- Poppins font.
- npm / pnpm / Yarn support — Bun is the only supported package manager.

### Changed

- Minimum runtime: Bun ≥ 1.1; Node.js is no longer used for local development.
- Dev server port changed from 3000 to 4000.

---

## [1.1.0] — 2024-01-01

Legacy v1 release (Next.js + Sass + static data).

[Unreleased]: https://github.com/nixrajput/portfolio-nextjs/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/nixrajput/portfolio-nextjs/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/nixrajput/portfolio-nextjs/releases/tag/v1.1.0
