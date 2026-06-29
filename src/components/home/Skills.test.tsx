import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";

// Mock framer-motion to avoid jsdom animation issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    li: ({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={className} {...props}>
        {children}
      </li>
    ),
  },
}));

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/image to a simple img
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockSkills = [
  { name: "React", iconPath: "/skills/react.svg", category: "Frontend", order: 1 },
  { name: "TypeScript", iconPath: "/skills/typescript.svg", category: "Frontend", order: 2 },
  { name: "Node.js", iconPath: "/skills/nodejs.svg", category: "Backend", order: 3 },
  { name: "PostgreSQL", iconPath: "/skills/postgresql.svg", category: "Backend", order: 4 },
];

describe("Skills", () => {
  it("renders skill names", () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it("renders category headings", () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    render(<Skills skills={mockSkills} />);
    expect(screen.getByText("Tools I work with")).toBeInTheDocument();
  });

  it("renders the skills section with correct id", () => {
    const { container } = render(<Skills skills={mockSkills} />);
    const section = container.querySelector("#skills");
    expect(section).toBeTruthy();
  });

  it("renders an empty state gracefully", () => {
    render(<Skills skills={[]} />);
    expect(screen.getByText("Tools I work with")).toBeInTheDocument();
  });
});
