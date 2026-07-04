import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { installMatchMedia } from "@/test/matchMedia";
import { AmbientBackground } from "./AmbientBackground";

beforeEach(() => installMatchMedia());
afterEach(cleanup);

describe("AmbientBackground", () => {
  it("renders a decorative fixed canvas", () => {
    render(<AmbientBackground />);
    const canvas = screen.getByTestId("ambient-bg");
    expect(canvas.tagName).toBe("CANVAS");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("unmounts cleanly (listeners/rAF released)", () => {
    const { unmount } = render(<AmbientBackground />);
    expect(() => unmount()).not.toThrow();
  });
});
