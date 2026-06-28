# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
