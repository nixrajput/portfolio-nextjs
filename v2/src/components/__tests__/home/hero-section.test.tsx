import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/home/hero-section";
import { names, roles } from "@/data/intro";

// Mock the motion components
jest.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

// Mock the BackgroundBeamsWithCollision component
jest.mock("@/components/ui/background-beams-with-collision", () => {
  return function MockBackgroundBeams({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="mock-background-beams">{children}</div>;
  };
});

// Mock the FlipWords component
jest.mock("@/components/ui/flip-words", () => {
  return function MockFlipWords({
    words,
    className,
  }: {
    words: string[];
    className?: string;
  }) {
    return (
      <div data-testid="mock-flip-words" className={className}>
        {words[0]}
      </div>
    );
  };
});

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("mock-background-beams")).toBeInTheDocument();
  });

  it("displays the first name from the names array", () => {
    render(<HeroSection />);
    const flipWordsElements = screen.getAllByTestId("mock-flip-words");
    expect(flipWordsElements[0]).toHaveTextContent(names[0]);
  });

  it("displays the first role from the roles array", () => {
    render(<HeroSection />);
    const flipWordsElements = screen.getAllByTestId("mock-flip-words");
    expect(flipWordsElements[1]).toHaveTextContent(roles[0]);
  });

  it("renders the Book a Call button", () => {
    render(<HeroSection />);
    const button = screen.getByRole("button", { name: /book a call/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-gradient-to-r");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    render(<HeroSection className={customClass} />);
    expect(screen.getByTestId("mock-background-beams")).toHaveClass(
      customClass
    );
  });
});
