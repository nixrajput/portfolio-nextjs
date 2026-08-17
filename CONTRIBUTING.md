# Contributing to Portfolio v2

Thank you for your interest in contributing. This document covers the conventions and workflow for this project.

## Code of Conduct

Please read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting started

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/portfolio-nextjs.git
   cd portfolio-nextjs
   ```

2. Install dependencies with **Bun** (the only supported package manager):

   ```bash
   bun install
   ```

3. Follow the [Local setup](README.md#local-setup) section in the README to configure your `.env.local` and database.

4. Enable the pre-push hook once:

   ```bash
   git config core.hooksPath .githooks
   ```

## Branch naming

Use lowercase, hyphen-separated names that describe the work:

- `feat/<short-description>` - new feature
- `fix/<short-description>` - bug fix
- `docs/<short-description>` - documentation only
- `chore/<short-description>` - maintenance, tooling, deps
- `refactor/<short-description>` - code restructuring without behaviour change

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). A `.gitmessage` template is committed to the repo - configure it once:

```bash
git config commit.template .gitmessage
```

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `revert`.

Rules:
- Subject line ≤ 72 characters, imperative mood (`add`, not `added`).
- No `Co-Authored-By: Claude` or similar generated lines.
- Reference an issue in the body when applicable (`Closes #123`).

Example:

```
feat: add testimonial approval notifications via Resend

Sends an email to CONTACT_EMAIL whenever a new testimonial submission
arrives, so the admin can act on it promptly.

Closes #42
```

## Before submitting a pull request

Run the full local gate and make sure everything is green:

```bash
bun run lint           # must be 0 errors
bun run format:check   # or run `bun run format` to fix
bun run check:spell    # add new words to cspell.json
bun run typecheck      # must be clean
bun run test           # all unit tests must pass
bun run test:e2e       # optional but encouraged for UI changes
```

The first five are exactly what `.githooks/pre-push` runs, so a push does this for you once
hooks are enabled (step 4 of the README setup).

CI runs the same checks plus the production build and two checks that need a running server:

```bash
bun run build && bun run start
bun run check:routes   # asserts routes serve the right content, not just a 200
bun run check:vitals   # per-route JS payload and TTFB budgets
```

The build is deliberately left out of the pre-push hook: it is a webpack build that also
needs a reachable, seeded database, and a minute-plus gate teaches people to reach for
`--no-verify`.

A failing CI gate will block merge. Every PR must also bump the `version` in
`package.json` - the `package.json version bumped` check enforces it.

## Pull request guidelines

- Keep PRs focused on a single concern.
- Fill in the PR template (summary, type of change, testing steps, checklist).
- Link the relevant issue in the PR description.
- Address review feedback before asking for re-review.

## Reporting issues

Use the [Issues](https://github.com/nixrajput/portfolio-nextjs/issues) tab. Choose the appropriate template (Bug Report or Feature Request) and fill it in completely.
