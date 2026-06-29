# Nikhil Rajput — Portfolio (v2)

Personal portfolio website for [Nikhil Rajput](https://nixrajput.com), rebuilt from scratch on the modern Next.js 16 stack with a database-driven content layer, GitHub OAuth admin panel, and full CI/test suite.

[![Stars](https://img.shields.io/github/stars/nixrajput/portfolio-nextjs?label=Stars&style=flat)][repo]
[![Forks](https://img.shields.io/github/forks/nixrajput/portfolio-nextjs?label=Forks&style=flat)][repo]
[![Watchers](https://img.shields.io/github/watchers/nixrajput/portfolio-nextjs?label=Watchers&style=flat)][repo]
[![Contributors](https://img.shields.io/github/contributors/nixrajput/portfolio-nextjs?label=Contributors&style=flat)][repo]

[![GitHub last commit](https://img.shields.io/github/last-commit/nixrajput/portfolio-nextjs?label=Last+Commit&style=flat)][repo]
[![GitHub issues](https://img.shields.io/github/issues/nixrajput/portfolio-nextjs?label=Issues&style=flat)][issues]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/nixrajput/portfolio-nextjs?label=Pull+Requests&style=flat)][pulls]
[![GitHub License](https://img.shields.io/github/license/nixrajput/portfolio-nextjs?label=License&style=flat)][license]

---

## Table of Contents

- [Nikhil Rajput — Portfolio (v2)](#nikhil-rajput--portfolio-v2)
  - [Table of Contents](#table-of-contents)
  - [Stack](#stack)
  - [Architecture overview](#architecture-overview)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
    - [1. Clone and install](#1-clone-and-install)
    - [2. Environment variables](#2-environment-variables)
    - [3. Database setup](#3-database-setup)
    - [4. Git hooks](#4-git-hooks)
    - [5. Run the dev server](#5-run-the-dev-server)
  - [Commands](#commands)
  - [Admin panel](#admin-panel)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)
  - [Sponsor me](#sponsor-me)
  - [Connect with me](#connect-with-me)

---

## Stack

| Layer           | Technology                                                          |
| --------------- | ------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)           |
| UI library      | [React 19](https://react.dev/)                                      |
| Language        | TypeScript                                                          |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/), Geist font             |
| Animation       | [Framer Motion](https://www.framer-motion.com/)                     |
| Icons           | [Lucide React](https://lucide.dev/)                                 |
| Database        | PostgreSQL via [postgres-js](https://github.com/porsager/postgres)  |
| ORM             | [Drizzle ORM](https://orm.drizzle.team/)                            |
| Auth            | [Auth.js v5](https://authjs.dev/) — GitHub OAuth                    |
| File storage    | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)          |
| Email           | [Resend](https://resend.com/)                                       |
| Analytics       | [Vercel Analytics](https://vercel.com/analytics) + Google Analytics |
| Package manager | [Bun](https://bun.sh/)                                              |
| Unit tests      | [Vitest](https://vitest.dev/) + Testing Library                     |
| E2E tests       | [Playwright](https://playwright.dev/)                               |
| Deployment      | [Vercel](https://vercel.com/)                                       |

---

## Architecture overview

- **DB-driven content** — profile, projects, experiences, skills, services, social links, and taglines are stored in PostgreSQL and seeded via `bun run db:seed`. The admin panel allows live CRUD editing.
- **GitHub cache** — project metadata (stars, forks, descriptions) is fetched from the GitHub API at build time and revalidated server-side via `GITHUB_TOKEN`. Only repos listed in the database are enriched.
- **Testimonials** — visitors can submit testimonials with an optional avatar upload to Vercel Blob. Submissions land in a moderation queue; the admin approves or rejects them before they appear publicly. Resend emails the admin on new submissions.
- **Admin panel** — protected by GitHub OAuth (`AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`). Access is restricted to the GitHub login set in `ADMIN_GITHUB_LOGIN` (default: `nixrajput`). The panel exposes CRUD tabs for all content types plus the testimonial moderation queue.
- **SEO / GEO** — structured metadata, Open Graph, Twitter cards, Google verification, and `robots.txt` are generated from the database profile row and site config.

---

## Prerequisites

- **[Bun](https://bun.sh/) ≥ 1.1** — the only supported package manager and runtime.
- **PostgreSQL ≥ 14** — running locally or via a managed service (Neon, Supabase, etc.).
- A **GitHub OAuth App** for admin login (Settings → Developer settings → OAuth Apps).

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/nixrajput/portfolio-nextjs.git
cd portfolio-nextjs
bun install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable                                | Required    | Description                                                                         |
| --------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `DATABASE_URL`                          | Yes         | PostgreSQL connection string, e.g. `postgres://user:pass@localhost:5432/portfolio`  |
| `AUTH_SECRET`                           | Yes         | Random secret for Auth.js session encryption (`openssl rand -base64 32`)            |
| `AUTH_GITHUB_ID`                        | Yes         | GitHub OAuth App client ID                                                          |
| `AUTH_GITHUB_SECRET`                    | Yes         | GitHub OAuth App client secret                                                      |
| `ADMIN_GITHUB_LOGIN`                    | Yes         | GitHub username allowed to access the admin panel (e.g. `nixrajput`)                |
| `GITHUB_TOKEN`                          | Recommended | GitHub personal access token for project metadata fetching (higher rate limits)     |
| `BLOB_READ_WRITE_TOKEN`                 | Yes (prod)  | Vercel Blob token for testimonial avatar uploads                                    |
| `RESEND_API_KEY`                        | Yes (prod)  | Resend API key for admin notification emails                                        |
| `RESEND_FROM_EMAIL`                     | Yes (prod)  | From address for emails, e.g. `Portfolio <noreply@nixrajput.com>` (verified domain) |
| `CONTACT_EMAIL`                         | Yes (prod)  | Email address to receive testimonial submission notifications                       |
| `REVALIDATE_SECRET`                     | Yes (prod)  | Secret for the `/api/revalidate` on-demand revalidation endpoint                    |
| `NEXT_PUBLIC_SITE_URL`                  | Yes         | Canonical site URL, e.g. `https://nixrajput.com`                                    |
| `NEXT_PUBLIC_GTAG_ID`                   | Optional    | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`)                               |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN` | Optional    | Google Search Console site verification token                                       |

> The resume link is stored in the database (`profile.resumeUrl`) and managed from the admin panel — not via an environment variable.

### 3. Database setup

Run migrations to create the schema, then seed initial data:

```bash
bunx drizzle-kit migrate
bun run db:seed
```

### 4. Git hooks

Enable the pre-push lint + format gate once per clone:

```bash
git config core.hooksPath .githooks
```

This runs `bun run lint` and `bun run format:check` before every push. Bypass in an emergency with `git push --no-verify`.

### 5. Run the dev server

```bash
bun run dev
```

The site is available at [http://localhost:4000](http://localhost:4000).

---

## Commands

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `bun run dev`          | Start dev server (Turbopack, port 4000) |
| `bun run build`        | Production build (Turbopack)            |
| `bun run start`        | Start production server                 |
| `bun run lint`         | Run ESLint                              |
| `bun run lint:fix`     | Run ESLint with auto-fix                |
| `bun run format`       | Format source files with Prettier       |
| `bun run format:check` | Check formatting without writing        |
| `bun run typecheck`    | Run `tsc --noEmit`                      |
| `bun run test`         | Run Vitest unit tests                   |
| `bun run test:watch`   | Run Vitest in watch mode                |
| `bun run test:e2e`     | Run Playwright end-to-end tests         |
| `bun run db:generate`  | Generate a new Drizzle migration        |
| `bun run db:migrate`   | Apply pending migrations                |
| `bun run db:push`      | Push schema changes directly (dev only) |
| `bun run db:studio`    | Open Drizzle Studio                     |
| `bun run db:seed`      | Seed the database with initial data     |

---

## Admin panel

The admin panel is at `/admin` and requires authentication via GitHub OAuth.

- Only the GitHub account set in `ADMIN_GITHUB_LOGIN` (e.g. `nixrajput`) can sign in.
- After signing in you have access to CRUD tabs for profile, projects, experiences, skills, services, social links, taglines, and funding links.
- Testimonial submissions appear in a moderation queue. Approve a testimonial to make it visible on the site; reject to discard it.

---

## Deployment

The site is deployed on [Vercel](https://vercel.com/). The main branch deploys automatically.

1. Import the repository in Vercel.
2. Add all required environment variables in the Vercel project settings.
3. Provision a PostgreSQL database (Vercel Postgres / Neon) and set `DATABASE_URL` to its **pooled** connection string.
4. Seed the production database **once** by hand against the production `DATABASE_URL`: `DATABASE_URL=<prod> bun run db:seed`. The seed is guarded (seed-if-empty), so it inserts the initial content only when the database is empty and never overwrites later edits.
5. Push to `master` — Vercel runs the `vercel-build` script, which applies pending migrations and then builds. It does **not** seed; data seeding is the one-time manual step above, and further content changes are made in the admin panel.

The local `DATABASE_URL` stays pointed at your local Postgres for development; only the Vercel environment uses the production database.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Sponsor me

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/nixrajput)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/nixrajput)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/nixrajput)

---

## Connect with me

[![GitHub: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=GitHub&logoColor=333&link=https://www.github.com/nixrajput)][github]
[![LinkedIn: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=LinkedIn&logoColor=blue&link=https://www.linkedin.com/in/nixrajput)][linkedin]
[![Instagram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Instagram&link=https://www.instagram.com/nixrajput)][instagram]
[![X: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=X&logoColor=333&link=https://x.com/nixrajput)][twitter]

[github]: https://github.com/nixrajput
[twitter]: https://x.com/nixrajput
[instagram]: https://instagram.com/nixrajput
[linkedin]: https://linkedin.com/in/nixrajput
[repo]: https://github.com/nixrajput/portfolio-nextjs
[issues]: https://github.com/nixrajput/portfolio-nextjs/issues
[pulls]: https://github.com/nixrajput/portfolio-nextjs/pulls
[license]: https://github.com/nixrajput/portfolio-nextjs/blob/master/LICENSE
