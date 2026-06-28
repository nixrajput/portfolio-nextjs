import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WordReveal } from "./WordReveal";

vi.mock("@/hooks/useReducedMotion", () => ({ useReducedMotion: () => true }));

describe("WordReveal", () => {
  it("renders the full text in a paragraph under reduced motion", () => {
    render(<WordReveal text="Nikhil Rajput is a software engineer" />);
    expect(screen.getByText("Nikhil Rajput is a software engineer")).toBeInTheDocument();
  });
});
