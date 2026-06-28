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
    expect(globalsContent).toContain("--color-base: #07070c");
    expect(globalsContent).toContain("--color-surface: #0b0b14");
    expect(globalsContent).toContain("--color-light-base: #fafafa");
  });

  it("should define gradient and font tokens", () => {
    expect(globalsContent).toContain("--gradient-brand:");
    expect(globalsContent).toContain("--font-sans: var(--font-geist-sans)");
    expect(globalsContent).toContain("--font-mono: var(--font-geist-mono)");
  });
});
