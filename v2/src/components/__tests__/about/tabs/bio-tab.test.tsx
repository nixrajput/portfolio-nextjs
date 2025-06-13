import { render, screen } from "@testing-library/react";
import BioTab from "@/components/about/tabs/bio-tab";
import { bio1, bio2, bio3 } from "@/data";

describe("BioTab", () => {
  it("renders with default content", () => {
    render(<BioTab />);

    expect(screen.getByText("Hello there! 👋")).toBeInTheDocument();
    expect(screen.getByText(bio1)).toBeInTheDocument();
    expect(screen.getByText(bio2)).toBeInTheDocument();
    expect(screen.getByText(bio3)).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const customClass = "custom-class";
    render(<BioTab className={customClass} />);

    const container =
      screen.getByText("Hello there! 👋").parentElement?.parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("has correct text styling", () => {
    render(<BioTab />);

    const paragraphs = screen.getAllByText(/.*/);
    paragraphs.forEach((p) => {
      if (p.textContent !== "Hello there! 👋") {
        expect(p).toHaveClass(
          "text-neutral-700",
          "dark:text-neutral-300",
          "leading-relaxed",
          "text-base",
          "font-normal"
        );
      }
    });
  });
});
