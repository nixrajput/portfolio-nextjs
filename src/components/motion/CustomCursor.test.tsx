import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { installMatchMedia } from "@/test/matchMedia";
import { CustomCursor } from "./CustomCursor";

afterEach(cleanup);

describe("CustomCursor", () => {
  it("renders dot and ring on fine pointers", () => {
    installMatchMedia({ "(pointer: fine)": true });
    const { container } = render(<CustomCursor />);
    expect(container.querySelectorAll("[data-cursor-part]")).toHaveLength(2);
    expect(document.documentElement.classList.contains("cursor-hidden")).toBe(true);
  });

  it("renders nothing on coarse pointers", () => {
    installMatchMedia({ "(pointer: fine)": false });
    const { container } = render(<CustomCursor />);
    expect(container.querySelectorAll("[data-cursor-part]")).toHaveLength(0);
  });

  it("renders nothing under reduced motion", () => {
    installMatchMedia({
      "(pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": true,
    });
    const { container } = render(<CustomCursor />);
    expect(container.querySelectorAll("[data-cursor-part]")).toHaveLength(0);
  });

  it("removes the cursor-hidden class on unmount", () => {
    installMatchMedia({ "(pointer: fine)": true });
    const { unmount } = render(<CustomCursor />);
    unmount();
    expect(document.documentElement.classList.contains("cursor-hidden")).toBe(false);
  });
});
