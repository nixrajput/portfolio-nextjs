<div align="center">

<img src="https://raw.githubusercontent.com/nixrajput/portfolio-nextjs/master/assets/logo.svg" width="76" alt="Nikhil Rajput">

# Nikhil Rajput · Portfolio

<em>A portfolio that is edited, not redeployed.</em>

<br />

[![CI](https://github.com/nixrajput/portfolio-nextjs/actions/workflows/ci.yml/badge.svg)][ci]
[![Lighthouse](https://github.com/nixrajput/portfolio-nextjs/actions/workflows/lighthouse.yml/badge.svg)][lighthouse]
[![Stars](https://img.shields.io/github/stars/nixrajput/portfolio-nextjs?color=7C3AED)][repo]
[![Contributors](https://img.shields.io/github/contributors/nixrajput/portfolio-nextjs?color=7C3AED)][contributors]
[![License: MIT](https://img.shields.io/github/license/nixrajput/portfolio-nextjs?color=7C3AED)][license]
[![Last commit](https://img.shields.io/github/last-commit/nixrajput/portfolio-nextjs?label=last%20commit)][repo]
[![Issues](https://img.shields.io/github/issues/nixrajput/portfolio-nextjs?label=issues)][issues]
[![PRs](https://img.shields.io/github/issues-pr/nixrajput/portfolio-nextjs?label=PRs)][pulls]

<strong>Every section DB-driven &middot; GitHub OAuth admin &middot; light / dark / system &middot; five brand palettes &middot; ISR with on-demand revalidation</strong><br>
<sub>There is no benchmark here, and a portfolio site does not deserve one. What is checkable instead: <strong>283 unit tests</strong> across 44 files plus <strong>10 Playwright end-to-end tests</strong>; a route check that asserts every page serves the <em>right content</em> rather than a 200, which is the only way to test an <a href="https://github.com/nixrajput/portfolio-nextjs/blob/master/scripts/check-routes.mjs">admin route that is protected <em>and</em> returns 200</a>; per-route JS payload and TTFB budgets measured against a production build, which <a href="https://github.com/nixrajput/portfolio-nextjs/blob/master/scripts/check-vitals.mjs">refuse to measure a dev server</a> because unminified bundles read several times heavier; and Lighthouse gating <strong>accessibility, best practices and SEO at &ge; 0.90</strong> on every pull request. <a href="https://github.com/nixrajput/portfolio-nextjs/actions/workflows/ci.yml">See the runs</a>.</sub>

<br />

**[Live site][site]** &middot; [Stack](#stack) &middot; [Local setup](#local-setup) &middot; [Admin panel](#admin-panel) &middot; [Deployment](#deployment)

<sub><b>AI agents / LLMs:</b> the site is machine-readable at <a href="https://nixrajput.com/llms.txt"><code>llms.txt</code></a>, or as one blob at <a href="https://nixrajput.com/llms-full.txt"><code>llms-full.txt</code></a>. Repo conventions and pitfalls live in <a href="AGENTS.md"><code>AGENTS.md</code></a>.</sub>

</div>

---

## Table of Contents

- [Nikhil Rajput · Portfolio](#nikhil-rajput--portfolio)
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
  - [Contributors](#contributors)
  - [License](#license)
  - [Support the project](#support-the-project)
  - [Connect](#connect)

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
| Auth            | [Auth.js v5](https://authjs.dev/) - GitHub OAuth                    |
| File storage    | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)          |
| Email           | [Resend](https://resend.com/)                                       |
| Analytics       | [Vercel Analytics](https://vercel.com/analytics) + Google Analytics |
| Package manager | [Bun](https://bun.sh/)                                              |
| Unit tests      | [Vitest](https://vitest.dev/) + Testing Library                     |
| E2E tests       | [Playwright](https://playwright.dev/)                               |
| Deployment      | [Vercel](https://vercel.com/)                                       |

---

## Architecture overview

- **DB-driven content** - profile, projects, experiences, skills, services, social links, taglines, and FAQs are stored in PostgreSQL and seeded via `bun run db:seed`. The admin panel allows live CRUD editing. The profile drives the hero (name, editable role marquee, "Currently" tagline, avatar) and the About section.
- **Image uploads** - the profile avatar, skill icons and project media (cover image plus up to six quick-view screenshots) are uploaded from the admin panel to Vercel Blob and served from the CDN. Icons fit inside a 128px box with SVG stored raw; project media fits inside 1600×1000, since a screenshot squeezed into an icon box is unreadable. Every field also accepts a plain URL, and existing static asset paths keep working.
- **GitHub cache** - stars, forks, languages, descriptions and a README excerpt per repo, plus account-level followers/stars/repo counts, are cached in Postgres with a **24-hour TTL** and served from the last-known-good row so they never flash blank. A GitHub outage or rate limit falls back to the stale row rather than erroring. Only repos listed in the database are enriched.
- **Theming and brand palette** - light/dark/system plus five selectable brand palettes (Iris by default), chosen from the appearance menu in the nav and remembered in `localStorage`. `src/lib/brand.ts` is the build-time source of truth for the default; `globals.css` mirrors it as CSS variables and `src/app/globals.theme.test.ts` fails if the two drift. Server-rendered artifacts that cannot be per-visitor (Open Graph image, PWA manifest, notification emails) always use the default.
- **Testimonials** - visitors submit testimonials through a validated form (inline per-field errors) with an optional cropped avatar uploaded to Vercel Blob. Submissions land in a moderation queue; the admin approves or rejects them before they appear publicly. Resend emails the admin on new submissions.
- **Admin panel** - protected by GitHub OAuth (`AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`). Access is restricted to the GitHub login set in `ADMIN_GITHUB_LOGIN` (default: `nixrajput`). The panel exposes CRUD tabs for all content types plus the testimonial moderation queue.
- **SEO / GEO** - structured metadata, Open Graph, Twitter cards, Google verification, and `robots.txt` are generated from the database profile row and site config.

---

## Prerequisites

- **[Bun](https://bun.sh/) ≥ 1.1** - the only supported package manager and runtime.
- **PostgreSQL ≥ 14** - running locally or via a managed service (Neon, Supabase, etc.).
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

| Variable                                | Required    | Description                                                                                   |
| --------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                          | Yes         | PostgreSQL connection string, e.g. `postgres://user:pass@localhost:5432/portfolio`            |
| `AUTH_SECRET`                           | Yes         | Random secret for Auth.js session encryption (`openssl rand -base64 32`)                      |
| `AUTH_GITHUB_ID`                        | Yes         | GitHub OAuth App client ID                                                                    |
| `AUTH_GITHUB_SECRET`                    | Yes         | GitHub OAuth App client secret                                                                |
| `ADMIN_GITHUB_LOGIN`                    | Yes         | GitHub username allowed to access the admin panel (e.g. `nixrajput`)                          |
| `GITHUB_TOKEN`                          | Recommended | GitHub personal access token for project metadata fetching (higher rate limits)               |
| `BLOB_READ_WRITE_TOKEN`                 | Yes (prod)  | Vercel Blob token for image uploads (avatar, skill icons, project media, testimonial avatars) |
| `RESEND_API_KEY`                        | Yes (prod)  | Resend API key for admin notification emails                                                  |
| `RESEND_FROM_EMAIL`                     | Yes (prod)  | From address for emails, e.g. `Portfolio <noreply@nixrajput.com>` (verified domain)           |
| `CONTACT_EMAIL`                         | Yes (prod)  | Email address to receive testimonial submission notifications                                 |
| `REVALIDATE_SECRET`                     | Yes (prod)  | Secret for the `/api/revalidate` on-demand revalidation endpoint                              |
| `NEXT_PUBLIC_SITE_URL`                  | Yes         | Canonical site URL, e.g. `https://nixrajput.com`                                              |
| `NEXT_PUBLIC_GTAG_ID`                   | Optional    | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`)                                         |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN` | Optional    | Google Search Console site verification token                                                 |

> The resume link is stored in the database (`profile.resumeUrl`) and managed from the admin panel - not via an environment variable.

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

| Command                | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `bun run dev`          | Start dev server (Turbopack, port 4000)                          |
| `bun run build`        | Production build (**webpack**, see the note below)               |
| `bun run start`        | Start production server (port 3000)                              |
| `bun run lint`         | Run ESLint                                                       |
| `bun run lint:fix`     | Run ESLint with auto-fix                                         |
| `bun run format`       | Format source files with Prettier                                |
| `bun run format:check` | Check formatting without writing                                 |
| `bun run check:spell`  | Spell-check source, scripts and root markdown (cspell)           |
| `bun run typecheck`    | Run `tsc --noEmit`                                               |
| `bun run test`         | Run Vitest unit tests                                            |
| `bun run test:watch`   | Run Vitest in watch mode                                         |
| `bun run test:e2e`     | Run Playwright end-to-end tests                                  |
| `bun run check:routes` | Assert every route serves the right **content** (needs a server) |
| `bun run check:vitals` | Per-route JS payload and TTFB budgets (needs a server)           |
| `bun run db:generate`  | Generate a new Drizzle migration                                 |
| `bun run db:migrate`   | Apply pending migrations                                         |
| `bun run db:push`      | Push schema changes directly (dev only)                          |
| `bun run db:studio`    | Open Drizzle Studio                                              |
| `bun run db:seed`      | Seed the database with initial data                              |

> **The production build uses webpack, not Turbopack, on purpose.** `sharp` is a native addon used server-side for image optimization, and Turbopack rewrites it into a hashed external module that Vercel cannot load at runtime. `bun run dev` still uses Turbopack.

`check:routes` and `check:vitals` run against a running server, so build and start first:

```bash
bun run build && bun run start
bun run check:routes    # BASE_URL=http://localhost:4000 to check a dev server instead
bun run check:vitals    # refuses a dev server: unminified bundles give meaningless numbers
```

---

## Admin panel

The admin panel is at `/admin` and requires authentication via GitHub OAuth.

- Only the GitHub account set in `ADMIN_GITHUB_LOGIN` (e.g. `nixrajput`) can sign in.
- After signing in you have access to CRUD tabs for profile, projects, experiences, skills, services, social links, taglines, FAQs, and funding links.
- The profile editor manages your name, bio, hero role marquee, "Currently" tagline, resume link, and avatar (upload or URL). Skill icons are uploaded or URL-pasted per skill.
- The projects editor curates which repos appear and how: title, blurb, tags, order, featured/hidden flags, a cover image, and up to six screenshots for the quick view. `order` doubles as the showcase ranking - the leading featured rows get the large cells above the grid, and the rest keep a "Featured" badge inside it.
- Settings controls per-section visibility. A hidden section runs no query and never loads its chunk, so hiding one also makes the page lighter.
- Testimonial submissions appear in a moderation queue. Approve a testimonial to make it visible on the site; reject to discard it.

Image uploads (avatar, skill icons, project cover and screenshots) require `BLOB_READ_WRITE_TOKEN` to be set.

Years of experience is derived from the experience rows' start years, not from GitHub - so it increments on its own each January and counts professional work rather than how long the GitHub account has existed.

---

## Deployment

The site is deployed on [Vercel](https://vercel.com/). The main branch deploys automatically.

1. Import the repository in Vercel.
2. Add all required environment variables in the Vercel project settings.
3. Provision a PostgreSQL database (Vercel Postgres / Neon) and set `DATABASE_URL` to its **pooled** connection string.
4. Seed the production database **once** by hand against the production `DATABASE_URL`: `DATABASE_URL=<prod> bun run db:seed`. The seed is guarded (seed-if-empty), so it inserts the initial content only when the database is empty and never overwrites later edits.
5. Push to `master` - Vercel runs the `vercel-build` script, which applies pending migrations and then builds. It does **not** seed; data seeding is the one-time manual step above, and further content changes are made in the admin panel.

The local `DATABASE_URL` stays pointed at your local Postgres for development; only the Vercel environment uses the production database.

---

## Contributing

Contributions are welcome. Fork, branch, and open a PR - see [CONTRIBUTING.md](CONTRIBUTING.md) for the checks a PR has to pass. Bugs and ideas go to [Issues][issues]; vulnerabilities follow [SECURITY.md](SECURITY.md).

Repo conventions, the local gate, and the pitfalls worth knowing before touching the design system live in [AGENTS.md](AGENTS.md).

## Contributors

Thanks to everyone who has contributed to this portfolio.

<a href="https://github.com/nixrajput/portfolio-nextjs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nixrajput/portfolio-nextjs" alt="Contributors" />
</a>

## License

Licensed under the **MIT** license - see [LICENSE](LICENSE).

## Support the project

<div align="center">

This portfolio is MIT licensed and free to fork, always. If it saved you building your own admin panel and content layer, sponsorship is welcome.

<br />

<a href="https://github.com/sponsors/nixrajput">
  <img src="https://img.shields.io/badge/Sponsor_on_GitHub-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" />
</a>
<a href="https://ko-fi.com/nixrajput">
  <img src="https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Ko-fi" />
</a>
<a href="https://buymeacoffee.com/nixrajput">
  <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee" />
</a>

</div>

## Connect

<div align="center">

**Nikhil Rajput**

<a href="https://github.com/nixrajput"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://linkedin.com/in/nixrajput"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://x.com/nixrajput07"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
<a href="https://instagram.com/nixrajput"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://telegram.me/nixrajput"><img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
<a href="mailto:nkr.nikhil.nkr@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</div>

[ci]: https://github.com/nixrajput/portfolio-nextjs/actions/workflows/ci.yml
[lighthouse]: https://github.com/nixrajput/portfolio-nextjs/actions/workflows/lighthouse.yml
[site]: https://nixrajput.com
[repo]: https://github.com/nixrajput/portfolio-nextjs
[issues]: https://github.com/nixrajput/portfolio-nextjs/issues
[pulls]: https://github.com/nixrajput/portfolio-nextjs/pulls
[contributors]: https://github.com/nixrajput/portfolio-nextjs/graphs/contributors
[license]: https://github.com/nixrajput/portfolio-nextjs/blob/master/LICENSE
