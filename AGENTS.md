# AI Agent Guidelines

Last updated: 2026-08-17

The working-discipline and multi-agent-safety rules that used to live here were a verbatim copy of `~/.claude/CLAUDE.md`, which is already loaded into every session. They were deleted rather than maintained in two places. This file now carries only what is true of **this repo** and cannot be derived from reading it quickly.

---

## Project

Personal portfolio and site for Nikhil Rajput, deployed at https://nixrajput.com. A database-driven Next.js app: every section of the homepage is content managed through an authenticated admin area rather than hardcoded.

| Area          | Detail                                                        |
| ------------- | ------------------------------------------------------------- |
| Runtime       | Bun (lockfile `bun.lockb`), TypeScript, ESM                   |
| Framework     | Next.js 16 (App Router) + React 19                            |
| Styling       | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Data          | Drizzle ORM + Postgres; migrations in `drizzle/`              |
| Auth          | NextAuth v5 (beta), admin-only                                |
| Platform      | Vercel - Blob (uploads), Analytics, Speed Insights            |
| Email         | Resend (testimonial notifications)                            |
| Lint / format | ESLint + Prettier - double quotes, semicolons, 100 columns    |
| Tests         | Vitest (unit/component) + Playwright (e2e in `e2e/`)          |

### Layout

```
src/app/                 App Router routes
src/app/admin/           authenticated CRUD for every content type
src/app/api/             route handlers (upload, revalidate, testimonials, auth)
src/app/globals.css      the entire design system - read the notes inside before editing
src/components/home/     homepage sections (Hero, About, Projects, ...)
src/components/ui/       primitives (Button, Card, Section, dialog, avatar)
src/components/admin/    admin shell + the generic CRUD page/form machinery
src/db/schema.ts         Drizzle schema, single source of truth for content types
src/db/seed.ts           `bun run db:seed`
src/lib/queries.ts       the homepage's data reads
src/lib/projects.ts      merges DB curation rows with cached GitHub stats
src/lib/github-cache.ts  24h-TTL GitHub cache, never throws
src/lib/seo/site.ts      SITE constants (canonical URL, title, description)
scripts/                 check-routes and check-vitals
```

## Things that will bite you

1. **The build is `next build --webpack`, not Turbopack, and that is deliberate.** `sharp` is a native addon used server-side for image optimisation; Turbopack rewrites it into a hashed external module Vercel cannot `dlopen`. `next.config.js` also marks it in `serverExternalPackages`. Do not "modernise" the build script - see commits `9e79c27` and `fc7bb71`, which exist because this was broken in production twice. `bun run dev` still uses Turbopack, which is fine.

2. **The homepage is ISR-prerendered at build time, so a build needs a reachable, migrated, seeded database.** `src/app/page.tsx` sets `revalidate = 60` and queries Postgres during prerender. This is why CI stands up a Postgres service and runs `drizzle-kit migrate` + `db:seed` **before** `bun run build`, and why a build with no `DATABASE_URL` fails in a way that looks unrelated to the database.

3. **Do not add unlayered CSS resets to `globals.css`.** An unlayered rule (`* { margin: 0 }`, `a { color: inherit }`, `button { background: transparent }`) beats every Tailwind utility regardless of specificity, because unlayered CSS outranks layered utilities. This has silently broken app-wide spacing and button text colours before. Tailwind v4 Preflight already resets correctly inside its layer. The file carries long comments saying this at each site - read them before touching it.

4. **The `@theme` -> `:root`/`.dark` indirection in `globals.css` is load-bearing.** Tailwind v4 only generates opacity modifiers (`/40`, `/[0.02]`) for colours registered as `--color-*` in `@theme`, but `@theme` cannot hold theme-switched values. So `@theme` declares `--color-surface: var(--surface)` and the raw value flips in `:root`/`.dark`. Swapping colour *values* is safe; restructuring this pattern silently kills every `border-(--brand-deep)/40` in the codebase.

   The default palette lives in **`src/lib/brand.ts`**, the build-time source of truth. `globals.css` mirrors it by hand because CSS cannot import TypeScript, and `src/app/globals.theme.test.ts` derives its expectations from `brand.ts` to assert the mirror still holds - so a colour change fails the suite until both are updated. Token names are hue-neutral (`deep`/`mid`/`bright`) because the old `violet`/`cyan`/`pink` names stopped being true at the Glacier rebrand and would be wrong again on any future palette.

5. **There are two colour sources, and which one to use is a real decision.** Visitors can pick a brand palette at runtime (`src/hooks/usePalette.ts`, applied as `data-palette` on `<html>`, with `[data-palette]` blocks in `globals.css`). That splits colour consumers in two:

   - **`brand.ts` constants** for anything server-rendered and shared, which a per-visitor choice cannot reach: `opengraph-image.tsx` (Satori at the edge), `manifest.ts` (JSON), `notify.ts` (email HTML, where custom properties are unsupported). These always show the default, correctly.
   - **CSS variables** for DOM chrome that must follow the choice: Tailwind classes, `Logo.tsx` (SVG `stop-color` resolves `var()`), `CustomCursor.tsx`. `AmbientBackground.tsx` is the awkward one - a canvas cannot inherit a variable, so it reads the ramp with `getComputedStyle` and re-reads when the palette or theme changes.

   Iris is the default and is represented by the **absence** of `data-palette`, since it lives in `:root`/`.dark`. Adding a `[data-palette="iris"]` block would be a second definition that could disagree with the first; the theme test asserts it does not exist. Decorative glows must use the `--brand-*-rgb` channel lists (`rgb(var(--brand-deep-rgb)/0.55)`) rather than literal `rgba()`, or they silently keep the old palette - five of them did exactly that, invisible to a hex search because they were written in decimal.

6. **`/admin` serves HTTP 200 while being correctly protected.** `src/app/admin/layout.tsx` calls `redirect("/login")`, but by then the shell has streamed, so Next cannot send a 3xx and embeds `NEXT_REDIRECT` plus a meta-refresh in a 200 response. Never assert the admin gate with a status code in either direction: a status check reads it as "page works", and a naive security check reads it as "unprotected". `scripts/check-routes.mjs` asserts on content, which is the only way to get this right.

7. **Every homepage section is behind a `sectionVisibility` toggle** (`profile.sectionVisibility`, edited in `/admin/settings`). A hidden section runs no query and never loads its chunk. Never write a test or check that asserts on section copy like "Projects" - a legitimate admin action would fail it. Anchor on `SITE` in `src/lib/seo/site.ts` instead.

8. **Static metadata icons keep their extension.** `apple-icon.png` serves at `/apple-icon.png`; a bare `/apple-icon` is a 404. The App Router's apple-icon convention also rejects SVG, so this one must stay a PNG.

9. **`next dev --turbopack` does not hot-reload `globals.css`. Restart the dev server after editing it.** HMR silently keeps serving the previously compiled stylesheet, so a token change appears to do nothing and the obvious conclusion - that the CSS is wrong - is wrong. Verified by diffing the served `/_next/static/chunks/*.css` against the source: it still carried the old custom-property names minutes after the edit. To confirm a CSS change is actually live, grep the served stylesheet rather than trusting the page; "server responds 200" is not a readiness signal for CSS.

10. **Every public route ships roughly the same ~1425KB of JS** (decompressed) because the *root layout* dominates: `ThemeProvider`, `AmbientBackground`, `CustomCursor`, `HashScrollFix` and three analytics scripts are client components on every route, `/login` included. Below-the-fold homepage sections are already split with `next/dynamic`, so a jump in `check:vitals` means something escaped that split rather than that a section grew.

## Adding a brand palette

Visitors pick a palette at runtime, so adding one touches four places and the pieces are checked against each other:

1. `src/lib/palettes.ts` - add the id to `PaletteId` and an entry to `PALETTES` with its three-stop ramp.
2. `src/app/globals.css` - add all three blocks: `[data-palette="<id>"]`, `[data-palette="<id>"]:not(.dark)` and `[data-palette="<id>"].dark`.
3. `src/app/layout.tsx` - add the id to the allowlist in the palette pre-paint `<script>`, or the choice will not survive a reload. This is the easy one to miss.
4. `bun run test` - `globals.theme.test.ts` fails if the picker swatch and the CSS disagree.

Check both themes: `multiply` on paper accumulates where `lighter` on a dark ground falls off fast, so a value that works in one can wash out the other.

Changing the **default** palette instead means editing `src/lib/brand.ts` plus its `:root`/`.dark` mirror in `globals.css`, and by hand: `src/app/icon.svg` and `assets/logo.svg`, which are static files and cannot follow a runtime choice.

## Commands

```bash
bun run dev          # Turbopack dev server on port 4000
bun run db:seed      # seed the database
bun run db:studio    # inspect it
```

The gate, run by CI and `.githooks/pre-push` (enable once per clone with `git config core.hooksPath .githooks`):

```bash
bun run lint && bun run format:check && bun run check:spell && bun run typecheck && bun run test
```

Plus, in CI only, `bun run build` and two checks that need a running server:

```bash
bun run build && bun run start
bun run check:routes    # asserts every route serves the right CONTENT, not a 200
bun run check:vitals    # per-route JS payload and TTFB budgets
```

`check:vitals` refuses to measure a dev server or a different site on the port, because both produce believable-but-wrong numbers - a dev server serves unminified bundles. Point `BASE_URL` at a production build. `bun run build` is deliberately **not** in the pre-push hook: it is a webpack build that also needs a live seeded database, and a minute-plus gate teaches people to reach for `--no-verify`.

## Conventions

- Prettier owns formatting - double quotes, semicolons, trailing commas, 100-column lines, 2-space indent. Do not hand-format; run `bun run format`.
- Conventional Commits per the repo's own `.gitmessage`, which is authoritative: imperative subject `<=` 50 chars, no trailing period, body bullets starting `- ` wrapped at 72. It says explicitly **never** to add `Generated with Claude Code`, `Co-Authored-By`, or author trailers, and no commit in this repo's history has one. `.claude/settings.json` sets `includeCoAuthoredBy: false` to match.
- **Never use em-dashes.** Use a hyphen instead. This applies to code comments, commit messages, and prose.
- Markdown prose is never hard-wrapped: one line per paragraph and per list item. Do not re-wrap these files to a column.
- New words go in `cspell.json`, which the gate checks over `src/`, `scripts/` and root markdown. **`src/db/seed.ts` is excluded on purpose**: it is sample content, so its testimonial authors and employer names churn freely, and listing them turned the dictionary into a registry of throwaway data. Do not add seed-only names back - change the seed instead. Names that are part of the site's real identity (`Nikhil`, `nixrajput`, `Rajput`, all in `src/lib/seo/site.ts` and elsewhere) do belong in the dictionary.
- The PR title becomes the squash commit message. `master` is protected: PR required, squash-only merges, admins may self-merge.

## Versioning and release

Every PR must bump `version` in `package.json`. `version-check.yml` enforces it as the required check **`package.json version bumped`**. On merge to `master`, `release.yml` reads that version and creates tag `v<version>` plus a GitHub Release, skipping idempotently if the tag already exists. There is no manual tagging step.

## Content model

`src/db/schema.ts` is the source of truth. Adding a content type means: a table, a migration (`bun run db:generate`), an admin page under `src/app/admin/` (the `AdminCrudPage` + `AdminField` machinery covers text, textarea, number, url, select, checkbox and image fields), server actions in `src/app/admin/actions.ts`, a read in `src/lib/queries.ts`, and a `revalidatePortfolio()` call so the ISR homepage picks it up. Image fields upload to Vercel Blob through `src/app/api/admin/upload`.
