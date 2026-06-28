import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect } from "vitest";

describe("globals.css theme tokens", () => {
  const globalsContent = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf-8");

  it("should contain @theme block", () => {
    expect(globalsContent).toContain("@theme {");
  });

  it("should define all brand color tokens with correct values", () => {
    expect(globalsContent).toContain("--color-brand-violet: #7c3aed");
    expect(globalsContent).toContain("--color-brand-cyan: #06b6d4");
    expect(globalsContent).toContain("--color-brand-pink: #ec4899");
    // Semantic tokens replaced the old internal palette tokens.
    // --color-base / --color-surface / --color-light-base were internal;
    // they are now exposed as --color-background / --color-surface / etc.
    // via the var(--bg) / var(--surface) indirection pattern.
    expect(globalsContent).toContain("--color-background: var(--bg)");
    expect(globalsContent).toContain("--color-foreground: var(--fg)");
    expect(globalsContent).toContain("--color-surface: var(--surface)");
  });

  it("should define gradient and font tokens", () => {
    expect(globalsContent).toContain("--gradient-brand:");
    expect(globalsContent).toContain("--font-sans: var(--font-geist-sans)");
    expect(globalsContent).toContain("--font-mono: var(--font-geist-mono)");
  });
});
