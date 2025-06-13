import { cn } from "../utils";

describe("Utility Functions", () => {
  describe("cn function", () => {
    it("merges class names correctly", () => {
      expect(cn("base-class", "additional-class")).toBe(
        "base-class additional-class"
      );
    });

    it("handles conditional classes", () => {
      expect(cn("base-class", { "conditional-class": true })).toBe(
        "base-class conditional-class"
      );
      expect(cn("base-class", { "conditional-class": false })).toBe(
        "base-class"
      );
    });

    it("handles undefined and null values", () => {
      expect(cn("base-class", undefined, null)).toBe("base-class");
    });

    it("merges Tailwind classes correctly", () => {
      expect(cn("p-4 bg-red-500", "p-6")).toBe("bg-red-500 p-6");
    });

    it("handles multiple conditional classes", () => {
      expect(
        cn(
          "base-class",
          { "true-class": true, "false-class": false },
          "additional-class"
        )
      ).toBe("base-class true-class additional-class");
    });
  });
});
