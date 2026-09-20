import { describe, expect, it } from "vitest";
import { pluralize } from "./plural";

describe("pluralize", () => {
  it("drops the s only at exactly one", () => {
    expect(pluralize(1, "fork")).toBe("1 fork");
    expect(pluralize(2, "fork")).toBe("2 forks");
    // Zero is plural in English, which is why this is not a truthiness check.
    expect(pluralize(0, "fork")).toBe("0 forks");
  });

  it("keeps a multi-word noun intact", () => {
    expect(pluralize(1, "GitHub star")).toBe("1 GitHub star");
    expect(pluralize(47, "GitHub star")).toBe("47 GitHub stars");
  });
});
