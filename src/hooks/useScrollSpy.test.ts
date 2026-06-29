import { describe, it, expect } from "vitest";
import { pickActive } from "./useScrollSpy";

describe("pickActive", () => {
  const ids = ["hero", "about", "skills"];

  it("returns first section when nothing has scrolled past the offset", () => {
    const tops = { hero: 0, about: 800, skills: 1600 };
    expect(pickActive(ids, tops, 120)).toBe("hero");
  });

  it("returns the last section whose top crossed the offset line", () => {
    const tops = { hero: -900, about: 50, skills: 900 };
    expect(pickActive(ids, tops, 120)).toBe("about");
  });

  it("returns the final section when all have scrolled past", () => {
    const tops = { hero: -2000, about: -1200, skills: -300 };
    expect(pickActive(ids, tops, 120)).toBe("skills");
  });

  it("falls back to the first id when ids is empty of measurements", () => {
    expect(pickActive(ids, {}, 120)).toBe("hero");
  });
});
