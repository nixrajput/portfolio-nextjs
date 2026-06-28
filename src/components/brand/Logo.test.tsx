import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an svg with accessible name matching /nikhil rajput/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /nikhil rajput/i })).toBeInTheDocument();
  });

  it("renders wordmark 'nixrajput' when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("nixrajput")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("nixrajput")).not.toBeInTheDocument();
  });
});
