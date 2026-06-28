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

  it("prepends 'a' before consonant-initial words when showArticle is true", () => {
    render(<FlipWords words={["Software Development Engineer"]} showArticle />);
    expect(screen.getByText(/^a Software Development Engineer$/)).toBeInTheDocument();
  });

  it("prepends 'an' before vowel-initial words when showArticle is true", () => {
    render(<FlipWords words={["Open Source Contributor"]} showArticle />);
    expect(screen.getByText(/^an Open Source Contributor$/)).toBeInTheDocument();
  });

  it("does not prepend an article when showArticle is false (default)", () => {
    render(<FlipWords words={["Open Source Contributor"]} />);
    const el = screen.getByText("Open Source Contributor");
    expect(el.textContent).not.toMatch(/^an? /);
  });
});
