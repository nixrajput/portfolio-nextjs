import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import type { SocialRow } from "@/components/home/Contact";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion to avoid jsdom animation issues
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

const mockSocials: SocialRow[] = [
  { platform: "github", url: "https://github.com/nixrajput", username: "nixrajput", order: 1 },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/nixrajput",
    username: "nixrajput",
    order: 2,
  },
  { platform: "twitter", url: "https://twitter.com/nixrajput", username: "nixrajput", order: 3 },
];

describe("Footer", () => {
  it("renders the footer element", () => {
    const { container } = render(<Footer socials={mockSocials} />);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  it("renders the Logo (icon only, no wordmark text)", () => {
    render(<Footer socials={mockSocials} />);
    // Wordmark text removed per design; the logo mark exposes an accessible label.
    expect(screen.queryByText("nixrajput")).toBeNull();
    expect(screen.getByRole("img", { name: /nikhil rajput logo/i })).toBeTruthy();
  });

  it("renders social icon links with accessible labels", () => {
    render(<Footer socials={mockSocials} />);
    expect(screen.getByLabelText("github")).toBeTruthy();
    expect(screen.getByLabelText("linkedin")).toBeTruthy();
    expect(screen.getByLabelText("twitter")).toBeTruthy();
  });

  it("renders external social links that open in a new tab (target=_blank)", () => {
    render(<Footer socials={mockSocials} />);
    const githubLink = screen.getByLabelText("github");
    expect(githubLink.getAttribute("href")).toBe("https://github.com/nixrajput");
    expect(githubLink.getAttribute("target")).toBe("_blank");
    expect(githubLink.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders the sign-off and copyright line", () => {
    render(<Footer socials={mockSocials} />);
    expect(screen.getByText(/Designed & built in India/)).toBeTruthy();
    expect(screen.getByText(/All rights reserved/)).toBeTruthy();
  });

  it("renders dynamic copyright year", () => {
    render(<Footer socials={mockSocials} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeTruthy();
  });

  it("renders empty socials gracefully", () => {
    render(<Footer socials={[]} />);
    expect(screen.getByText(/Designed & built in India/)).toBeTruthy();
  });
});
