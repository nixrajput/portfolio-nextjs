import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Testimonials } from "../Testimonials";

// matchMedia mock — jsdom does not implement it
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

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
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Reveal to render children directly
vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock SubmitTestimonialForm so dialog tests don't need fetch
vi.mock("@/components/testimonials/SubmitTestimonialForm", () => ({
  SubmitTestimonialForm: () => <div data-testid="submit-form">Form</div>,
  TESTIMONIAL_FORM_ID: "submit-testimonial-form",
}));

// Mock embla-carousel-react so Carousel works in jsdom
vi.mock("embla-carousel-react", () => {
  const api = {
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
    canScrollNext: vi.fn(() => true),
    canScrollPrev: vi.fn(() => false),
    scrollSnapList: vi.fn(() => [0, 1]),
    selectedScrollSnap: vi.fn(() => 0),
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  };
  return {
    default: () => [vi.fn(), api],
  };
});

const items = [
  {
    id: "1",
    name: "Jane Doe",
    relationship: "Colleague",
    content: "Brilliant work.",
    imageUrl: null,
    linkedinUrl: null,
    githubUrl: null,
    xUrl: null,
    websiteUrl: null,
  },
];

const itemsWithSocials = [
  {
    id: "2",
    name: "Bob Builder",
    relationship: "Client",
    content: "Excellent work, highly recommended!",
    imageUrl: null,
    linkedinUrl: "https://linkedin.com/in/bob",
    githubUrl: "https://github.com/bob",
    xUrl: null,
    websiteUrl: null,
  },
];

describe("Testimonials", () => {
  it("renders quote, name, relationship and a fallback avatar", () => {
    render(<Testimonials items={items} />);
    expect(screen.getByText(/Brilliant work/)).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Colleague")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders empty state with CTA button (not a link) that opens dialog", async () => {
    render(<Testimonials items={[]} />);
    expect(screen.getByText(/No testimonials yet/)).toBeInTheDocument();
    // CTA is a button that triggers the modal, not a link to /testimonials/new
    const cta = screen.getByRole("button", { name: /Share your experience/ });
    expect(cta).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Share your experience/ })).toBeNull();

    // Clicking the button opens the Radix dialog
    await userEvent.click(cta);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("renders Share your experience button in populated state", () => {
    render(<Testimonials items={items} />);
    expect(screen.getByRole("button", { name: /Share your experience/ })).toBeTruthy();
  });

  it("renders the testimonials section with correct id", () => {
    const { container } = render(<Testimonials items={items} />);
    expect(container.querySelector("#testimonials")).toBeTruthy();
  });

  it("renders social icon links when present on a card", () => {
    render(<Testimonials items={itemsWithSocials} />);
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/bob");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/bob");
  });

  it("does not render social icons when no social links exist", () => {
    render(<Testimonials items={items} />);
    expect(screen.queryByRole("link", { name: /linkedin/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /github/i })).toBeNull();
  });
});
