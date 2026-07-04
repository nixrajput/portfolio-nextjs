import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { installMatchMedia } from "@/test/matchMedia";
import { Support, type FundingRow } from "./Support";

vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Magnetic renders for real and reads matchMedia via useReducedMotion
beforeEach(() => installMatchMedia());

describe("Support", () => {
  it("renders null if no funding rows", () => {
    const { container } = render(<Support funding={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the primary funding link as the lead CTA", () => {
    const funding: FundingRow[] = [
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors/nixrajput",
        primary: true,
        order: 1,
      },
    ];

    render(<Support funding={funding} />);

    const primaryLink = screen.getByRole("link", { name: /github sponsors/i });
    // Primary variant carries the full brand gradient background
    expect(primaryLink.className).toMatch(/bg-\(image:--gradient-brand\)/);
    expect(primaryLink).toHaveClass("text-white");
  });

  it("renders secondary funding links as outlined buttons", () => {
    const funding: FundingRow[] = [
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors/nixrajput",
        primary: true,
        order: 1,
      },
      {
        label: "Ko-fi",
        url: "https://ko-fi.com/nixrajput",
        primary: false,
        order: 2,
      },
      {
        label: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/nixrajput",
        primary: false,
        order: 3,
      },
    ];

    render(<Support funding={funding} />);

    const kofiLink = screen.getByRole("link", { name: /ko-fi/i });
    const bmaLink = screen.getByRole("link", { name: /buy me a coffee/i });

    // Button secondary variant uses border-border token
    expect(kofiLink).toHaveClass("border");
    expect(bmaLink).toHaveClass("border");
  });

  it("sorts funding links by order", () => {
    const funding: FundingRow[] = [
      {
        label: "Ko-fi",
        url: "https://ko-fi.com/nixrajput",
        primary: false,
        order: 3,
      },
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors/nixrajput",
        primary: true,
        order: 1,
      },
      {
        label: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/nixrajput",
        primary: false,
        order: 2,
      },
    ];

    render(<Support funding={funding} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("GitHub Sponsors");
    expect(links[1]).toHaveTextContent("Buy Me a Coffee");
    expect(links[2]).toHaveTextContent("Ko-fi");
  });

  it("opens funding links in a new tab (target=_blank)", () => {
    const funding: FundingRow[] = [
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors/nixrajput",
        primary: true,
        order: 1,
      },
      {
        label: "Ko-fi",
        url: "https://ko-fi.com/nixrajput",
        primary: false,
        order: 2,
      },
    ];

    render(<Support funding={funding} />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  it("uses first funding link as primary if no primary flag", () => {
    const funding: FundingRow[] = [
      {
        label: "Ko-fi",
        url: "https://ko-fi.com/nixrajput",
        primary: false,
        order: 1,
      },
      {
        label: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/nixrajput",
        primary: false,
        order: 2,
      },
    ];

    render(<Support funding={funding} />);

    const kofiLink = screen.getByRole("link", { name: /ko-fi/i });
    // Falls back to the first row as primary (full gradient background)
    expect(kofiLink.className).toMatch(/bg-\(image:--gradient-brand\)/);
  });
});
