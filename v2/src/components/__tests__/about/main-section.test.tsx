import { render, screen } from "@testing-library/react";
import MainSection from "@/components/about/main-section";

// Mock child components
jest.mock("./profile-card", () => {
  return function MockProfileCard() {
    return <div data-testid="profile-card">Profile Card</div>;
  };
});

jest.mock("./profile-tabs", () => {
  return function MockProfileTabs() {
    return <div data-testid="profile-tabs">Profile Tabs</div>;
  };
});

jest.mock("./stats-section", () => {
  return function MockStatsSection() {
    return <div data-testid="stats-section">Stats Section</div>;
  };
});

jest.mock("@/components/common/section-title", () => {
  return function MockSectionTitle() {
    return <div data-testid="section-title">Section Title</div>;
  };
});

describe("MainSection", () => {
  it("renders all main components", () => {
    render(<MainSection />);

    // Check if all main components are rendered
    expect(screen.getByTestId("section-title")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("profile-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
  });

  it("has correct section ID and classes", () => {
    render(<MainSection />);

    const section =
      screen.getByTestId("section-title").parentElement?.parentElement;
    expect(section).toHaveAttribute("id", "about");
    expect(section).toHaveClass("relative", "h-auto", "py-20", "md:py-32");
  });
});
