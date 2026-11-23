# AI Agent Guidelines

Last updated: 2026-10-07

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

1. **The build is `next build --webpack`, not Turbopack, and that is deliberate.** `sharp` is a native addon used server-side for image optimisation. Turbopack rewrites it into a hashed external module that Vercel cannot `dlopen`. `next.config.js` also marks it in `serverExternalPackages`. WARNING: Do not "modernise" the build script. Commits `9e79c27` and `fc7bb71` exist because this broke in production twice. `bun run dev` still uses Turbopack, which is fine.

2. **The homepage is ISR-prerendered at build time, so a build needs a reachable, migrated, seeded database.** `src/app/page.tsx` queries Postgres during prerender. This is why CI starts a Postgres service and runs `drizzle-kit migrate` + `db:seed` **before** `bun run build`. It is also why a build with no `DATABASE_URL` fails in a way that looks unrelated to the database.

   **`revalidate = 43200` (12h) is a cost decision, not a freshness one.** Neon bills the wall-clock time that the compute endpoint is *awake*. Any query wakes it for the whole auto-suspend window, so a short window never lets it sleep. At `revalidate = 60`, the endpoint stays up ~730 h/month against a 100 h budget shared across every project. Content freshness does not depend on this timer at all. All ~30 mutations in `src/app/admin/actions.ts` call `revalidatePortfolio()`, which publishes immediately. The timer exists only so that the 24h GitHub cache TTL is noticed on schedule. A 12h value makes the real refresh interval land on 24h, not the ~25h that a 1h window produced. Raising it is nearly free. Lowering it is not.

3. **Do not add unlayered CSS resets to `globals.css`.** An unlayered rule (`* { margin: 0 }`, `a { color: inherit }`, `button { background: transparent }`) beats every Tailwind utility regardless of specificity, because unlayered CSS outranks layered utilities. This silently broke app-wide spacing and button text colours before. Tailwind v4 Preflight already resets correctly inside its layer. The file carries long comments saying this at each site - read them before touching it.

4. **The `@theme` -> `:root`/`.dark` indirection in `globals.css` is load-bearing.** Tailwind v4 only generates opacity modifiers (`/40`, `/[0.02]`) for colours registered as `--color-*` in `@theme`, but `@theme` cannot hold theme-switched values. So `@theme` declares `--color-surface: var(--surface)` and the raw value flips in `:root`/`.dark`. Swapping colour *values* is safe. Restructuring this pattern silently kills every `border-(--brand-deep)/40` in the codebase.

   The default palette lives in **`src/lib/brand.ts`**, the build-time source of truth. `globals.css` mirrors it by hand, because CSS cannot import TypeScript. `src/app/globals.theme.test.ts` derives its expectations from `brand.ts` to assert that the mirror still holds. So a colour change fails the suite until you update both. Token names are hue-neutral (`deep`/`mid`/`bright`). The old `violet`/`cyan`/`pink` names stopped being true at the Glacier rebrand, and would be wrong again on any future palette.

5. **There are two colour sources, and which one to use is a real decision.** Visitors can pick a brand palette at runtime (`src/hooks/usePalette.ts`, applied as `data-palette` on `<html>`, with `[data-palette]` blocks in `globals.css`). That splits colour consumers in two:

   - **`brand.ts` constants** for anything server-rendered and shared, which a per-visitor choice cannot reach. They are `opengraph-image.tsx` (Satori at the edge), `manifest.ts` (JSON) and `notify.ts` (email HTML, where custom properties are unsupported). These always show the default, correctly.
   - **CSS variables** for DOM chrome that must follow the choice: Tailwind classes, `Logo.tsx` (SVG `stop-color` resolves `var()`), `CustomCursor.tsx`. `AmbientBackground.tsx` is the awkward one. A canvas cannot inherit a variable, so it reads the ramp with `getComputedStyle`, and re-reads it when the palette or theme changes.

   Iris is the default and is represented by the **absence** of `data-palette`, since it lives in `:root`/`.dark`. Adding a `[data-palette="iris"]` block would be a second definition that could disagree with the first. The theme test asserts that it does not exist. Decorative glows must use the `--brand-*-rgb` channel lists (`rgb(var(--brand-deep-rgb)/0.55)`), not literal `rgba()`. Otherwise they silently keep the old palette. Five of them did exactly that, invisible to a hex search because they were written in decimal.

6. **`/admin` serves HTTP 200 while being correctly protected.** `src/app/admin/layout.tsx` calls `redirect("/login")` after the shell streams. So Next cannot send a 3xx. Instead, it embeds `NEXT_REDIRECT` plus a meta-refresh in a 200 response. Never assert the admin gate with a status code in either direction. A status check reads it as "page works", and a naive security check reads it as "unprotected". `scripts/check-routes.mjs` asserts on content, which is the only way to get this right.

7. **Every homepage section is behind a `sectionVisibility` toggle** (`profile.sectionVisibility`, edited in `/admin/settings`). A hidden section runs no query and never loads its chunk. Never write a test or check that asserts on section copy like "Projects" - a legitimate admin action would fail it. Anchor on `SITE` in `src/lib/seo/site.ts` instead.

8. **Static metadata icons keep their extension.** `apple-icon.png` serves at `/apple-icon.png`. A bare `/apple-icon` is a 404. The App Router's apple-icon convention also rejects SVG, so this one must stay a PNG.

9. **`next dev --turbopack` does not hot-reload `globals.css`. Restart the dev server after editing it.** HMR silently keeps serving the previously compiled stylesheet. So a token change appears to do nothing, and the obvious conclusion (that the CSS is wrong) is wrong. A diff of the served `/_next/static/chunks/*.css` against the source showed this: it still carried the old custom-property names minutes after the edit. To check that a CSS change is actually live, grep the served stylesheet rather than trusting the page. For CSS, "server responds 200" is not a readiness signal.

10. **Every public route ships roughly the same ~1425KB of JS** (decompressed), because the *root layout* dominates. `ThemeProvider`, `AmbientBackground`, `CustomCursor`, `HashScrollFix` and three analytics scripts are client components on every route, `/login` included. Below-the-fold homepage sections are already split with `next/dynamic`. So a jump in `check:vitals` means that something escaped that split, not that a section grew.

11. **Upload size is chosen per folder, and getting it wrong is invisible until someone looks.** `src/lib/blob.ts` has three entry points: `uploadIcon` fits inside **128px** (skill icons, SVG stored raw), `uploadAvatar` **1024px at quality 90**, `uploadProjectMedia` **1600x1000**. For a while, the profile portrait went through `uploadIcon`. So it was stored at 128px, and About upscaled it roughly 5x. It looked "dull and blurry", with nothing failing anywhere. `src/lib/__tests__/blob-avatar.test.ts` pins the boxes. Note also that a quality other than 75 must be listed in `images.qualities` in `next.config.js`. Next 16 allowlists it and rejects anything else with a 400 from the optimiser.

12. **Admin forms gate Save on being dirty, and the avatar does not wait for Save at all.** `src/components/admin/SubmitButton.tsx` finds its own form through the button's `form` property. It compares a serialised `FormData` snapshot, so any form gets this behaviour by using that button. There is no provider. Fields that write a hidden input from React state change the DOM value with **no native event**. So the uploaders dispatch a bubbling `input` via `src/hooks/useAnnounceValue.ts`. Otherwise an image-only edit leaves Save disabled. `AvatarField` deliberately does not announce, and submits no field at all. It is the sole writer of `profile.avatarUrl`, and commits through `setProfileAvatar` on upload. The profile form omits the key entirely. Validation with zod drops it as an absent optional, so Drizzle leaves the column alone. That is what stops a Save fired mid-upload from writing back the previous URL. An admin can paste any URL, so the action also rejects hosts that `next/image` cannot serve (`src/lib/image-hosts.ts`, pinned to `next.config.js` by its own test). Without that check, a saved avatar renders in the `unoptimized` admin preview while the public page shows nothing.

## Adding a brand palette

Visitors pick a palette at runtime, so adding one touches four places and the pieces are checked against each other:

1. `src/lib/palettes.ts` - add the id to `PaletteId` and an entry to `PALETTES` with its three-stop ramp.
2. `src/app/globals.css` - add all three blocks: `[data-palette="<id>"]`, `[data-palette="<id>"]:not(.dark)` and `[data-palette="<id>"].dark`.
3. `src/app/layout.tsx` - add the id to the allowlist in the palette pre-paint `<script>`, or the choice will not survive a reload. This is the easy one to miss.
4. `bun run test` - `globals.theme.test.ts` fails if the picker swatch and the CSS disagree.

Check both themes. `multiply` on paper accumulates, where `lighter` on a dark ground falls off fast. So a value that works in one theme can wash out the other.

Changing the **default** palette instead means editing `src/lib/brand.ts` plus its `:root`/`.dark` mirror in `globals.css`. Also edit `src/app/icon.svg` and `assets/logo.svg` by hand. They are static files and cannot follow a runtime choice.

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

`check:vitals` refuses to measure a dev server or a different site on the port. Both produce believable-but-wrong numbers - a dev server serves unminified bundles. Point `BASE_URL` at a production build. `bun run build` is deliberately **not** in the pre-push hook. It is a webpack build that also needs a live seeded database, and a minute-plus gate teaches people to reach for `--no-verify`.

## Conventions

- Prettier owns formatting: double quotes, semicolons, trailing commas, 100-column lines, 2-space indent. Do not hand-format. Run `bun run format`.
- Conventional Commits per the repo's own `.gitmessage`, which is authoritative: imperative subject `<=` 50 chars, no trailing period, body bullets starting `- ` wrapped at 72. It says explicitly **never** to add `Generated with Claude Code`, `Co-Authored-By`, or author trailers, and no commit in this repo's history has one. `.claude/settings.json` sets `includeCoAuthoredBy: false` to match.
- **Never use em-dashes.** Use a hyphen instead. This applies to code comments, commit messages, and prose.
- Markdown prose is never hard-wrapped: one line per paragraph and per list item. Do not re-wrap these files to a column.
- New words go in `cspell.json`, which the gate checks over `src/`, `scripts/` and root markdown. **`src/db/seed.ts` is excluded on purpose.** It is sample content, so its testimonial authors and employer names churn freely. Listing them turned the dictionary into a registry of throwaway data. Do not add seed-only names back. Change the seed instead. Names that are part of the site's real identity (`Nikhil`, `nixrajput`, `Rajput`, all in `src/lib/seo/site.ts` and elsewhere) do belong in the dictionary.
- The PR title becomes the squash commit message. `master` is protected: PR required, squash-only merges, admins may self-merge.

## Versioning and release

Every PR must bump `version` in `package.json`. `version-check.yml` enforces it as the required check **`package.json version bumped`**. On merge to `master`, `release.yml` reads that version and creates tag `v<version>` plus a GitHub Release, skipping idempotently if the tag already exists. There is no manual tagging step.

## Content model

`src/db/schema.ts` is the source of truth. Adding a content type means adding:

- a table
- a migration (`bun run db:generate`)
- an admin page under `src/app/admin/` (the `AdminCrudPage` + `AdminField` machinery covers text, textarea, number, url, select, checkbox and image fields)
- server actions in `src/app/admin/actions.ts`
- a read in `src/lib/queries.ts`
- a `revalidatePortfolio()` call, so the ISR homepage picks it up

Image fields upload to Vercel Blob through `src/app/api/admin/upload`.
