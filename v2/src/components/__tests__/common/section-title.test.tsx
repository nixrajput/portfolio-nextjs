import { render, screen } from "@testing-library/react";
import SectionTitle from "@/components/common/section-title";

// Mock motion/react
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

describe("SectionTitle", () => {
  it("renders without crashing", () => {
    render(<SectionTitle title="Test Title" highlightText="Highlight" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Highlight")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const description = "Test Description";
    render(
      <SectionTitle
        title="Test Title"
        highlightText="Highlight"
        description={description}
      />
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<SectionTitle title="Test Title" highlightText="Highlight" />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const { container } = render(
      <SectionTitle
        title="Test Title"
        highlightText="Highlight"
        className={customClass}
      />
    );
    expect(container.firstChild).toHaveClass(customClass);
  });

  it("applies gradient text to highlight text", () => {
    render(<SectionTitle title="Test Title" highlightText="Highlight" />);
    const highlightElement = screen.getByText("Highlight");
    expect(highlightElement).toHaveClass(
      "bg-clip-text",
      "text-transparent",
      "bg-gradient-to-r",
      "from-purple-500",
      "via-violet-500",
      "to-pink-500"
    );
  });

  it("renders title and highlight text in correct order", () => {
    render(<SectionTitle title="Test Title" highlightText="Highlight" />);
    const titleElement = screen.getByText("Test Title");
    const highlightElement = screen.getByText("Highlight");

    // Check if highlight text comes after the title
    expect(
      titleElement.compareDocumentPosition(highlightElement) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
