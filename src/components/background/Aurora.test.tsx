import { render } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock framer-motion to avoid jsdom scroll issues
vi.mock("framer-motion", () => ({
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  motion: {
    div: ({
      children,
      style,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & { style?: React.CSSProperties }) => (
      <div style={style} {...props}>
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

describe("Aurora", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders with aria-hidden=true", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: makeMatchMedia(false),
    });

    const { Aurora } = await import("./Aurora");
    const { getByTestId } = render(<Aurora />);
    expect(getByTestId("aurora")).toHaveAttribute("aria-hidden", "true");
  });

  it("pauses animation when prefers-reduced-motion is set", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: makeMatchMedia(true),
    });

    const { Aurora } = await import("./Aurora");
    const { getByTestId } = render(<Aurora />);
    const blob = getByTestId("aurora-blob");
    expect(blob).toHaveStyle({ animationPlayState: "paused" });
  });
});
