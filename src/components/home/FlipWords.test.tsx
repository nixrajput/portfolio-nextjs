import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlipWords } from "./FlipWords";

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

describe("FlipWords (reduced motion)", () => {
  it("renders the first word statically without animating", () => {
    render(<FlipWords words={["Engineer", "Builder"]} />);
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Builder")).not.toBeInTheDocument();
  });
});
