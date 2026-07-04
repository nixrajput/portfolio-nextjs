import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { installMatchMedia } from "@/test/matchMedia";
import { Hero } from "./Hero";

beforeEach(() => installMatchMedia());
afterEach(cleanup);

const profile = {
  name: "Nikhil Rajput",
  roles: ["Full Stack Developer", "Flutter Developer"],
};

describe("Hero", () => {
  it("renders the name as the h1, split across two display lines", () => {
    render(<Hero profile={profile} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/nikhil/i);
    expect(h1).toHaveTextContent(/rajput/i);
  });

  it("renders the availability status chip", () => {
    render(<Hero profile={profile} availability="Open to work" location="Lucknow, IN" />);
    expect(screen.getByText(/open to work · lucknow, in/i)).toBeInTheDocument();
  });

  it("omits the status chip without availability and location", () => {
    render(<Hero profile={profile} />);
    expect(screen.queryByText(/open to work/i)).not.toBeInTheDocument();
  });

  it("renders the roles marquee as decorative", () => {
    render(<Hero profile={profile} />);
    const marquee = screen.getByTestId("hero-marquee");
    expect(marquee).toHaveAttribute("aria-hidden", "true");
    expect(marquee).toHaveTextContent("Full Stack Developer");
  });

  it("renders View work always and Sponsor only with sponsorUrl", () => {
    const { rerender } = render(<Hero profile={profile} />);
    expect(screen.getByRole("link", { name: /view work/i })).toHaveAttribute("href", "#projects");
    expect(screen.queryByRole("link", { name: /sponsor/i })).not.toBeInTheDocument();
    rerender(<Hero profile={profile} sponsorUrl="https://github.com/sponsors/nixrajput" />);
    expect(screen.getByRole("link", { name: /sponsor/i })).toBeInTheDocument();
  });

  it("renders no avatar image and no scroll chevron", () => {
    render(<Hero profile={profile} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/scroll/i)).not.toBeInTheDocument();
  });
});
