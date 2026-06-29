import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandInitialsAvatar, initialsFromName } from "../avatar";

describe("initialsFromName", () => {
  it("takes up to two initials, uppercased", () => {
    expect(initialsFromName("jane doe")).toBe("JD");
    expect(initialsFromName("  Madonna ")).toBe("M");
    expect(initialsFromName("a b c d")).toBe("AB");
  });

  it("returns empty string for an empty input", () => {
    expect(initialsFromName("")).toBe("");
    expect(initialsFromName("   ")).toBe("");
  });
});

describe("BrandInitialsAvatar", () => {
  it("renders initials in the fallback when no src is provided", () => {
    render(<BrandInitialsAvatar name="Jane Doe" />);
    // delayMs is 0 when no src → fallback renders immediately.
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders an img element when src is provided", () => {
    render(<BrandInitialsAvatar name="Jane Doe" src="/photo.jpg" />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/photo.jpg");
    expect(img).toHaveAttribute("alt", "Jane Doe");
  });
});
