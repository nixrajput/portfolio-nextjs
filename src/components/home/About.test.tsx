import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockProfile = {
  bio: "I build fast, accessible web apps and love open source.",
  stats: { years: 4, repos: 120, stars: 250 },
};

describe("About", () => {
  it("renders the bio text", () => {
    render(<About profile={mockProfile} />);
    expect(
      screen.getByText("I build fast, accessible web apps and love open source."),
    ).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText("Years building")).toBeInTheDocument();
    expect(screen.getByText("Public repos")).toBeInTheDocument();
    expect(screen.getByText("GitHub stars")).toBeInTheDocument();
  });

  it("renders stat values with + suffix for values >= 100", () => {
    render(<About profile={mockProfile} />);
    // years = 4 → no suffix
    expect(screen.getByText("4")).toBeInTheDocument();
    // repos = 120 → "120+"
    expect(screen.getByText("120+")).toBeInTheDocument();
    // stars = 250 → "250+"
    expect(screen.getByText("250+")).toBeInTheDocument();
  });

  it("renders the section with correct id", () => {
    const { container } = render(<About profile={mockProfile} />);
    expect(container.querySelector("#about")).toBeTruthy();
  });

  it("renders the section heading", () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText("A bit about me")).toBeInTheDocument();
  });

  it("renders the eyebrow label", () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
