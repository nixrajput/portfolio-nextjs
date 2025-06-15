import { render, screen } from "@testing-library/react";
import StatsSection from "@/components/about/stats-section";
import { defaultStats } from "@/data";

// Mock AnimatedCounter component
jest.mock("@/components/common/animated-counter", () => {
  return function MockAnimatedCounter({ value }: { value: string }) {
    return <span data-testid="animated-counter">{value}</span>;
  };
});

describe("StatsSection", () => {
  it("renders with default stats", () => {
    render(<StatsSection />);

    defaultStats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByTestId("animated-counter")).toHaveTextContent(
        stat.count.toString()
      );
    });
  });

  it("renders with custom stats", () => {
    const customStats = [
      { count: 100, label: "Custom Stat 1" },
      { count: 200, label: "Custom Stat 2" },
    ];

    render(<StatsSection stats={customStats} />);

    customStats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByTestId("animated-counter")).toHaveTextContent(
        stat.count.toString()
      );
    });
  });

  it("has correct grid layout classes", () => {
    render(<StatsSection />);

    const container = screen
      .getByTestId("animated-counter")
      .closest("div")?.parentElement;
    expect(container).toHaveClass(
      "grid",
      "grid-cols-2",
      "md:grid-cols-4",
      "gap-4",
      "mt-8",
      "w-full"
    );
  });

  it("renders cards with correct styling", () => {
    render(<StatsSection />);

    const cards = screen.getAllByRole("article");
    cards.forEach((card) => {
      expect(card).toHaveClass(
        "border",
        "border-neutral-200",
        "dark:border-neutral-800",
        "bg-white/90",
        "dark:bg-neutral-900/90",
        "backdrop-blur-sm"
      );
    });
  });
});
