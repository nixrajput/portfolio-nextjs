import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Support, type FundingRow } from "./Support";

vi.mock("@/components/motion/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

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
    expect(primaryLink).toHaveClass("bg-[image:var(--gradient-brand)]");
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

    expect(kofiLink).toHaveClass("border");
    expect(kofiLink).toHaveClass("border-foreground/20");
    expect(bmaLink).toHaveClass("border");
    expect(bmaLink).toHaveClass("border-foreground/20");
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

  it("opens external links in new tab with proper security", () => {
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
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
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
    expect(kofiLink).toHaveClass("bg-[image:var(--gradient-brand)]");
  });
});
