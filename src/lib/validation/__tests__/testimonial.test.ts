import { describe, expect, it } from "vitest";
import { submitTestimonialSchema, moderateTestimonialSchema } from "../testimonial";

describe("submitTestimonialSchema", () => {
  const valid = {
    name: "Jane Doe",
    relationship: "Former colleague at NixLab",
    content: "Nikhil shipped our API rewrite two weeks early. Exceptional engineer.",
    website: "",
  };

  it("accepts a valid submission", () => {
    expect(submitTestimonialSchema.parse(valid)).toMatchObject({
      name: "Jane Doe",
    });
  });

  it("trims whitespace", () => {
    const r = submitTestimonialSchema.parse({
      ...valid,
      name: "  Jane Doe  ",
    });
    expect(r.name).toBe("Jane Doe");
  });

  it("rejects short content", () => {
    expect(() => submitTestimonialSchema.parse({ ...valid, content: "too short" })).toThrow();
  });

  it("rejects a filled honeypot", () => {
    expect(() => submitTestimonialSchema.parse({ ...valid, website: "http://spam" })).toThrow();
  });

  it("defaults the honeypot to empty when omitted", () => {
    const { name, relationship, content } = valid;
    expect(submitTestimonialSchema.parse({ name, relationship, content }).website).toBe("");
  });
});

describe("moderateTestimonialSchema", () => {
  it("rejects an unknown action", () => {
    expect(() =>
      moderateTestimonialSchema.parse({
        id: crypto.randomUUID(),
        action: "nuke",
      }),
    ).toThrow();
  });
});
