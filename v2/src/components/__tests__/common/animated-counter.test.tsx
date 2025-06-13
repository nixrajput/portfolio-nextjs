import { render, screen, act } from "@testing-library/react";
import AnimatedCounter from "@/components/common/animated-counter";

// Mock motion/react
jest.mock("motion/react", () => ({
  useAnimate: () => [{ current: document.createElement("div") }, jest.fn()],
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("AnimatedCounter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<AnimatedCounter value="100" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders with suffix", () => {
    render(<AnimatedCounter value="100+" />);
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("renders with decimal value", () => {
    render(<AnimatedCounter value="99.9%" />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const { container } = render(
      <AnimatedCounter value="100" className={customClass} />
    );
    expect(container.firstChild).toHaveClass(customClass);
  });

  it("starts animation when in view", () => {
    render(<AnimatedCounter value="100" />);

    // Simulate element coming into view
    act(() => {
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);
    });

    // Fast-forward time to see the animation progress
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Counter should have started incrementing
    const counter = screen.getByText(/^\d+$/);
    expect(parseInt(counter.textContent || "0")).toBeGreaterThan(0);
  });

  it("resets counter when out of view", () => {
    render(<AnimatedCounter value="100" />);

    // Simulate element coming into view
    act(() => {
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: true }]);
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Simulate element going out of view
    act(() => {
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      observerCallback([{ isIntersecting: false }]);
    });

    // Counter should reset to 0
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
