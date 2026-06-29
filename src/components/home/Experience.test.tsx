import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Experience } from "./Experience";
import type { ExperienceRow } from "@/lib/queries";

// Mock framer-motion to avoid jsdom animation issues
vi.mock("framer-motion", () => ({
  motion: {
    li: ({
      children,
      className,
      style,
      ...props
    }: React.HTMLAttributes<HTMLLIElement> & { style?: React.CSSProperties }) => (
      <li className={className} style={style} {...props}>
        {children}
      </li>
    ),
  },
}));

// Mock useReducedMotion — default: no reduced motion
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

// Mock Reveal (wraps framer-motion internally)
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockExperiences: ExperienceRow[] = [
  {
    id: 1,
    role: "Senior Software Engineer",
    org: "Acme Corp",
    period: "2022 – Present",
    location: "Remote",
    isCurrent: true,
    description: ["Built scalable APIs", "Led team of 5 engineers"],
    order: 1,
  },
  {
    id: 2,
    role: "Software Engineer",
    org: "Beta Inc",
    period: "2020 – 2022",
    location: "New York",
    isCurrent: false,
    description: ["Developed React apps", "Improved test coverage"],
    order: 2,
  },
];

describe("Experience", () => {
  it("renders experience roles", () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders experience orgs", () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Beta Inc")).toBeInTheDocument();
  });

  it("renders experience periods", () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText("2022 – Present")).toBeInTheDocument();
    expect(screen.getByText("2020 – 2022")).toBeInTheDocument();
  });

  it("renders experience descriptions", () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText("Built scalable APIs")).toBeInTheDocument();
    expect(screen.getByText("Led team of 5 engineers")).toBeInTheDocument();
  });

  it("renders the section with id='experience'", () => {
    const { container } = render(<Experience experiences={mockExperiences} />);
    expect(container.querySelector("#experience")).toBeTruthy();
  });

  it("renders static fallback when reduced motion is preferred", async () => {
    const { useReducedMotion } = await import("@/hooks/useReducedMotion");
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(<Experience experiences={mockExperiences} />);
    expect(container.querySelector("ol")).toBeTruthy();
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();

    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("renders empty state gracefully", () => {
    render(<Experience experiences={[]} />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders location when provided", () => {
    render(<Experience experiences={mockExperiences} />);
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });
});
