import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { installMatchMedia } from "@/test/matchMedia";
import { SiteNav } from "./SiteNav";

// Reduced motion => AnimatePresence has no exit animation, so close
// assertions can run synchronously after the event.
beforeEach(() => installMatchMedia({ "(prefers-reduced-motion: reduce)": true }));
afterEach(cleanup);

const socials = [
  { platform: "GitHub", url: "https://github.com/nixrajput" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/nixrajput" },
];

describe("SiteNav", () => {
  it("renders logo home link, tagline, and menu button", () => {
    render(<SiteNav tagline="Rise above limit" socials={socials} />);
    expect(screen.getByLabelText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/rise above limit/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("omits the tagline when not provided", () => {
    render(<SiteNav socials={socials} />);
    expect(screen.queryByText(/rise above limit/i)).not.toBeInTheDocument();
  });

  it("shows the tagline in the menu footer", () => {
    render(<SiteNav tagline="Rise above limit" socials={socials} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    // Tagline appears both in the top bar and the footer once the menu opens.
    expect(screen.getAllByText(/rise above limit/i).length).toBeGreaterThan(1);
  });

  it("opens the menu dialog with 9 numbered section links and socials", () => {
    render(<SiteNav tagline="Rise above limit" socials={socials} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = screen.getByRole("dialog", { name: /navigation/i });
    expect(dialog).toBeInTheDocument();
    const sectionLinks = screen.getAllByTestId("menu-section-link");
    expect(sectionLinks).toHaveLength(9);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", socials[0].url);
  });

  it("closes on Escape and returns aria-expanded to false", () => {
    render(<SiteNav socials={socials} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes when a section link is chosen", () => {
    render(<SiteNav socials={socials} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getAllByTestId("menu-section-link")[1]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
