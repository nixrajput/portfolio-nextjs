import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as a <button> by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders as an <a> when href is given", () => {
    render(<Button href="/about">About</Button>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies the secondary variant class", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-border");
  });

  it("applies the ghost variant class", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("text-muted");
  });

  it("applies a custom className", () => {
    render(<Button className="my-custom">Custom</Button>);
    expect(screen.getByRole("button").className).toContain("my-custom");
  });

  it("renders leftIcon alongside children", () => {
    render(<Button leftIcon={<span data-testid="icon">★</span>}>With Icon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });
});
