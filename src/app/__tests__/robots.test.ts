import { describe, expect, it } from "vitest";
import robots from "../robots";

describe("robots", () => {
  const r = robots();
  const rules = Array.isArray(r.rules) ? r.rules : [r.rules];

  it("disallows /admin for the wildcard agent", () => {
    const wildcard = rules.find((x) => x.userAgent === "*")!;
    expect(wildcard.disallow).toContain("/admin");
  });

  it("explicitly allows known AI crawlers", () => {
    const agents = rules.map((x) => x.userAgent);
    expect(agents).toContain("GPTBot");
    expect(agents).toContain("ClaudeBot");
    expect(agents).toContain("PerplexityBot");
    expect(agents).toContain("Google-Extended");
  });

  it("references the sitemap", () => {
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
