import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import type { MergedProject } from "@/lib/projects";

// Suppress Meteors animation side effects in jsdom
vi.mock("@/components/ui/Meteors", () => ({
  Meteors: () => null,
}));

const base: MergedProject = {
  id: 1,
  repo: "rippl",
  title: "Rippl",
  customBlurb: "A thing.",
  tags: ["Flutter"],
  featured: true,
  order: 0,
  hidden: false,
  stars: 42,
  forks: 7,
  language: "Dart",
  description: "A thing.",
  homepage: null,
  htmlUrl: "https://github.com/nixrajput/rippl",
};

describe("ProjectCard", () => {
  it("renders live stars and forks", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByLabelText("42 stars")).toBeInTheDocument();
    expect(screen.getByLabelText("7 forks")).toBeInTheDocument();
  });

  it("omits the Live link when there is no homepage", () => {
    render(<ProjectCard project={base} />);
    expect(screen.queryByText("Live")).not.toBeInTheDocument();
  });

  it("shows the Live link when a homepage exists", () => {
    render(<ProjectCard project={{ ...base, homepage: "https://x.dev" }} />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders null stats as em-dash", () => {
    render(<ProjectCard project={{ ...base, stars: null, forks: null }} />);
    const dashes = screen.getAllByText("—");
    expect(dashes).toHaveLength(2);
  });

  it("renders the project title", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByText("Rippl")).toBeInTheDocument();
  });

  it("renders Code link pointing to GitHub URL", () => {
    render(<ProjectCard project={base} />);
    const codeLink = screen.getByText("Code").closest("a");
    expect(codeLink).toHaveAttribute("href", "https://github.com/nixrajput/rippl");
  });

  it("renders tech tags as badge pills", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByText("Flutter")).toBeInTheDocument();
    expect(screen.getByText("Dart")).toBeInTheDocument();
  });
});
