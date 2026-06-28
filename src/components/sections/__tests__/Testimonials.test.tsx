import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Testimonials } from "../Testimonials";

// jsdom does not implement HTMLDialogElement.showModal / close
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

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
    // CTA is now a button that triggers the modal, not a link to /testimonials/new
    const cta = screen.getByRole("button", { name: /Leave a testimonial/ });
    expect(cta).toBeTruthy();
    expect(screen.queryByRole("link", { name: /Leave a testimonial/ })).toBeNull();

    // Clicking the button opens the dialog
    await userEvent.click(cta);
    expect(screen.getByRole("dialog", { hidden: true })).toBeTruthy();
  });

  it("renders Leave a testimonial button in populated state", () => {
    render(<Testimonials items={items} />);
    expect(screen.getByRole("button", { name: /Leave a testimonial/ })).toBeTruthy();
  });

  it("renders the testimonials section with correct id", () => {
    const { container } = render(<Testimonials items={items} />);
    expect(container.querySelector("#testimonials")).toBeTruthy();
  });
});
