import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText("Hello Card")).toBeInTheDocument();
  });

  it("applies base classes", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-2xl");
    expect(card.className).toContain("border-border");
    expect(card.className).toContain("bg-surface");
  });

  it("merges custom className", () => {
    render(
      <Card className="extra-class" data-testid="card">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card").className).toContain("extra-class");
  });

  it("renders as article when as=article", () => {
    render(
      <Card as="article" data-testid="card">
        Article Card
      </Card>,
    );
    const el = screen.getByTestId("card");
    expect(el.tagName.toLowerCase()).toBe("article");
  });

  it("renders as div by default", () => {
    render(<Card data-testid="card">Default</Card>);
    expect(screen.getByTestId("card").tagName.toLowerCase()).toBe("div");
  });
});
