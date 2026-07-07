import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect } from "vitest";

describe("globals.css theme tokens", () => {
  const globalsContent = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf-8");

  it("should contain @theme block", () => {
    expect(globalsContent).toContain("@theme {");
  });

  it("should define all brand color tokens with correct values", () => {
    expect(globalsContent).toContain("--color-brand-violet: #155e75");
    expect(globalsContent).toContain("--color-brand-cyan: #0891b2");
    expect(globalsContent).toContain("--color-brand-pink: #22d3ee");
    // Semantic tokens replaced the old internal palette tokens.
    // --color-base / --color-surface / --color-light-base were internal;
    // they are now exposed as --color-background / --color-surface / etc.
    // via the var(--bg) / var(--surface) indirection pattern.
    expect(globalsContent).toContain("--color-background: var(--bg)");
    expect(globalsContent).toContain("--color-foreground: var(--fg)");
    expect(globalsContent).toContain("--color-surface: var(--surface)");
  });

  it("should define hue-biased ink/paper and redesign tokens", () => {
    // light
    expect(globalsContent).toContain("--bg: #f6f7f9");
    expect(globalsContent).toContain("--fg: #14181f");
    // dark
    expect(globalsContent).toContain("--bg: #060c0e");
    expect(globalsContent).toContain("--fg: #e8f4f7");
    // new tokens present in both theme blocks
    expect(globalsContent.match(/--name-stroke:/g)?.length).toBeGreaterThanOrEqual(2);
    expect(globalsContent.match(/--overlay-bg:/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("should define gradient and font tokens", () => {
    expect(globalsContent).toContain("--gradient-brand:");
    expect(globalsContent).toContain("--font-sans: var(--font-geist-sans)");
    expect(globalsContent).toContain("--font-mono: var(--font-geist-mono)");
  });
});
