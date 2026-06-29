import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Services } from "./Services";
import type { ServiceRow } from "./Services";

// Mock framer-motion to avoid jsdom animation issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & { style?: React.CSSProperties }) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
    span: ({
      children,
      className,
      style,
      ...props
    }: React.HTMLAttributes<HTMLSpanElement> & { style?: React.CSSProperties }) => (
      <span className={className} style={style} {...props}>
        {children}
      </span>
    ),
  },
  useMotionValue: (initial: number) => ({ set: vi.fn(), get: () => initial }),
  useSpring: (val: unknown) => val,
  useTransform: (_: unknown, fn?: (v: number) => unknown) =>
    fn ? { get: () => fn(0.5) } : { get: () => 0 },
}));

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useReducedMotion
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockServices: ServiceRow[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Building fast, responsive websites.",
    shortDescription: null,
    icon: "Globe",
    order: 1,
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Cross-platform apps with Flutter.",
    shortDescription: null,
    icon: "Smartphone",
    order: 2,
  },
  {
    id: 3,
    title: "API Design",
    description: "RESTful and GraphQL APIs.",
    shortDescription: null,
    icon: "Code",
    order: 3,
  },
];

describe("Services", () => {
  it("renders service titles", () => {
    render(<Services services={mockServices} />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("API Design")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<Services services={mockServices} />);
    expect(screen.getByText("Building fast, responsive websites.")).toBeInTheDocument();
    expect(screen.getByText("Cross-platform apps with Flutter.")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    render(<Services services={mockServices} />);
    expect(screen.getByText("What I do")).toBeInTheDocument();
  });

  it("renders the services section with correct id", () => {
    const { container } = render(<Services services={mockServices} />);
    expect(container.querySelector("#services")).toBeTruthy();
  });

  it("renders empty state gracefully", () => {
    render(<Services services={[]} />);
    expect(screen.getByText("What I do")).toBeInTheDocument();
  });
});
