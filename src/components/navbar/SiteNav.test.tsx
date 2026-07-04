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
  it("renders logo home link, status line, and menu button", () => {
    render(<SiteNav location="Lucknow, IN" availability="Open to work" socials={socials} />);
    expect(screen.getByLabelText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/lucknow, in · open to work/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("omits the status line without location", () => {
    render(<SiteNav socials={socials} />);
    expect(screen.queryByText(/open to work/i)).not.toBeInTheDocument();
  });

  it("opens the menu dialog with 8 numbered section links and socials", () => {
    render(<SiteNav location="Lucknow, IN" availability="Open to work" socials={socials} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = screen.getByRole("dialog", { name: /navigation/i });
    expect(dialog).toBeInTheDocument();
    const sectionLinks = screen.getAllByTestId("menu-section-link");
    expect(sectionLinks).toHaveLength(8);
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
