import { render, screen } from "@testing-library/react";
import HomePageComponent from "@/components/home";

// Mock the HeroSection component since we'll test it separately
jest.mock("@/components/home/hero-section", () => {
  return function MockHeroSection() {
    return <div data-testid="mock-hero-section">Hero Section</div>;
  };
});

describe("HomePageComponent", () => {
  it("renders without crashing", () => {
    render(<HomePageComponent />);
    expect(screen.getByTestId("mock-hero-section")).toBeInTheDocument();
  });

  it("renders within PageWrapper", () => {
    const { container } = render(<HomePageComponent />);
    // Check if the component is wrapped in a div (PageWrapper)
    expect(container.firstChild).toHaveClass("relative");
  });
});
