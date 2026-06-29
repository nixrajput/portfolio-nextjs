import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PersonJsonLd, WebSiteJsonLd, FaqJsonLd } from "../jsonld";

function parse(html: string) {
  return JSON.parse(html);
}

describe("JSON-LD", () => {
  it("emits a valid Person schema with sameAs links", () => {
    const { container } = render(<PersonJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]')!;
    const data = parse(script.innerHTML);
    expect(data["@type"]).toBe("Person");
    expect(Array.isArray(data.sameAs)).toBe(true);
    expect(data.sameAs.length).toBeGreaterThan(0);
  });

  it("emits a valid WebSite schema", () => {
    const { container } = render(<WebSiteJsonLd />);
    const data = parse(container.querySelector("script")!.innerHTML);
    expect(data["@type"]).toBe("WebSite");
    expect(data.url).toMatch(/^https?:\/\//);
  });

  it("emits a valid FAQPage schema with mainEntity questions", () => {
    const { container } = render(
      <FaqJsonLd faqs={[{ question: "Who is Nikhil?", answer: "An engineer." }]} />,
    );
    const data = parse(container.querySelector("script")!.innerHTML);
    expect(data["@type"]).toBe("FAQPage");
    expect(Array.isArray(data.mainEntity)).toBe(true);
    expect(data.mainEntity.length).toBeGreaterThan(0);
    const first = data.mainEntity[0];
    expect(first["@type"]).toBe("Question");
    expect(typeof first.name).toBe("string");
    expect(first.acceptedAnswer["@type"]).toBe("Answer");
    expect(typeof first.acceptedAnswer.text).toBe("string");
  });
});
