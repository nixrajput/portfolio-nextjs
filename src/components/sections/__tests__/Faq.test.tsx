import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "../Faq";

// Stub FaqJsonLd — it emits a <script> tag which is opaque in jsdom
vi.mock("@/lib/seo/jsonld", () => ({
  FaqJsonLd: () => null,
}));

describe("Faq", () => {
  it("renders the FAQ section with id='faq'", () => {
    const { container } = render(<Faq />);
    expect(container.querySelector("#faq")).toBeTruthy();
  });

  it("renders the section heading", () => {
    render(<Faq />);
    expect(screen.getByText(/Frequently asked/i)).toBeTruthy();
  });

  it("renders all FAQ questions", () => {
    render(<Faq />);
    expect(screen.getByText("Who is Nikhil Rajput?")).toBeTruthy();
    expect(screen.getByText("What does Nikhil build?")).toBeTruthy();
    expect(screen.getByText("What is Nikhil's tech stack?")).toBeTruthy();
    expect(screen.getByText("Is Nikhil available for collaboration?")).toBeTruthy();
    expect(screen.getByText("How can I contact Nikhil?")).toBeTruthy();
  });

  it("answers are hidden by default (hidden attribute)", () => {
    const { container } = render(<Faq />);
    const regions = container.querySelectorAll("[role='region']");
    regions.forEach((region) => {
      expect(region.hasAttribute("hidden")).toBe(true);
    });
  });

  it("toggles an answer open when its button is clicked", async () => {
    render(<Faq />);
    const button = screen.getByRole("button", { name: /Who is Nikhil Rajput/i });
    expect(button.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    // The answer text is now visible (hidden attribute removed)
    expect(screen.getByText(/Software Development Engineer and AI Lead/)).toBeTruthy();
  });

  it("collapses the answer when the button is clicked again", async () => {
    render(<Faq />);
    const button = screen.getByRole("button", { name: /Who is Nikhil Rajput/i });

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("each button has aria-controls referencing its answer region", () => {
    const { container } = render(<Faq />);
    const buttons = container.querySelectorAll("button[aria-expanded]");
    buttons.forEach((btn) => {
      const controlsId = btn.getAttribute("aria-controls");
      expect(controlsId).toBeTruthy();
      expect(container.querySelector(`#${controlsId}`)).toBeTruthy();
    });
  });
});
