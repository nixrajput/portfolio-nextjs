import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section, SectionHeading } from "../Section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies the id to the section element", () => {
    render(<Section id="about">Content</Section>);
    const section = document.querySelector("section");
    expect(section).toHaveAttribute("id", "about");
  });

  it("applies py-20 and md:py-28 base classes", () => {
    render(<Section data-testid="sec">Content</Section>);
    const section = screen.getByTestId("sec");
    expect(section.className).toContain("py-20");
  });

  it("merges custom className", () => {
    render(
      <Section className="extra" data-testid="sec">
        Content
      </Section>,
    );
    expect(screen.getByTestId("sec").className).toContain("extra");
  });
});

describe("SectionHeading", () => {
  it("renders the title", () => {
    render(<SectionHeading title="My Title" />);
    expect(screen.getByRole("heading", { level: 2, name: "My Title" })).toBeInTheDocument();
  });

  it("renders the eyebrow when provided", () => {
    render(<SectionHeading title="Title" eyebrow="Featured" />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("does not render the eyebrow when omitted", () => {
    render(<SectionHeading title="Title" />);
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});
