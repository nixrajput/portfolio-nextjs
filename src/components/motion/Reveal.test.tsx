import { render } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock framer-motion to avoid jsdom animation/scroll issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// matchMedia mock factory
function makeMatchMedia(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("Reveal", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders its children", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: makeMatchMedia(false),
    });

    const { Reveal } = await import("./Reveal");
    const { getByText } = render(<Reveal>Hello Reveal</Reveal>);
    expect(getByText("Hello Reveal")).toBeTruthy();
  });

  it("passes className to the rendered element", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: makeMatchMedia(false),
    });

    const { Reveal } = await import("./Reveal");
    const { container } = render(<Reveal className="test-class">Content</Reveal>);
    const el = container.firstChild as HTMLElement;
    expect(el.classList.contains("test-class")).toBe(true);
  });
});
