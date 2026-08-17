import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { installMatchMedia } from "@/test/matchMedia";
import { About } from "./About";

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// AnimatedStat renders for real (count-up) — force reduced motion so it shows
// the final values synchronously, and provide matchMedia for the hook.
beforeEach(() => installMatchMedia({ "(prefers-reduced-motion: reduce)": true }));

const mockProfile = {
  bio: "I build fast, accessible web apps and love open source.",
  stats: { years: 4, repos: 120, stars: 250, followers: 87 },
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
    expect(screen.getByText("Years of experience")).toBeInTheDocument();
    expect(screen.getByText("Public repos")).toBeInTheDocument();
    expect(screen.getByText("GitHub stars")).toBeInTheDocument();
    expect(screen.getByText("GitHub followers")).toBeInTheDocument();
  });

  it("renders stat values with + suffix for values >= 100", () => {
    render(<About profile={mockProfile} />);
    // years = 4 → no suffix
    expect(screen.getByText("4")).toBeInTheDocument();
    // repos = 120 → "120+"
    expect(screen.getByText("120+")).toBeInTheDocument();
    // stars = 250 → "250+"
    expect(screen.getByText("250+")).toBeInTheDocument();
    // followers = 87 → no suffix (< 100)
    expect(screen.getByText("87")).toBeInTheDocument();
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
