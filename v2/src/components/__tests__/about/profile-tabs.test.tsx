import { render, screen } from "@testing-library/react";
import ProfileTabs from "@/components/about/profile-tabs";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

// Mock AnimatedTabs component
jest.mock("@/components/ui/animated-tabs", () => {
  return function MockAnimatedTabs({ tabs }: { tabs: Tab[] }) {
    return (
      <div data-testid="animated-tabs">
        {tabs.map((tab) => (
          <div key={tab.value} data-testid={`tab-${tab.value}`}>
            {tab.title}
          </div>
        ))}
      </div>
    );
  };
});

describe("ProfileTabs", () => {
  it("renders with default tabs", () => {
    render(<ProfileTabs />);

    expect(screen.getByTestId("animated-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("tab-bio")).toHaveTextContent("Biography");
    expect(screen.getByTestId("tab-skills")).toHaveTextContent("Skills");
    expect(screen.getByTestId("tab-experience")).toHaveTextContent(
      "Experience"
    );
  });

  it("renders with custom tabs", () => {
    const customTabs = [
      {
        title: "Custom Tab 1",
        value: "custom1",
        content: <div>Custom Content 1</div>,
      },
      {
        title: "Custom Tab 2",
        value: "custom2",
        content: <div>Custom Content 2</div>,
      },
    ];

    render(<ProfileTabs tabs={customTabs} />);

    expect(screen.getByTestId("animated-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("tab-custom1")).toHaveTextContent("Custom Tab 1");
    expect(screen.getByTestId("tab-custom2")).toHaveTextContent("Custom Tab 2");
  });

  it("has correct container classes", () => {
    render(<ProfileTabs />);

    const container = screen.getByTestId("animated-tabs").parentElement;
    expect(container).toHaveClass(
      "h-[20rem]",
      "md:h-[30rem]",
      "[perspective:1000px]",
      "relative",
      "flex",
      "flex-col",
      "flex-1",
      "mx-auto",
      "w-full",
      "items-start",
      "justify-start"
    );
  });
});
