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

  it("normalizes a bare Instagram handle to a canonical URL", () => {
    expect(
      submitTestimonialSchema.parse({ ...valid, instagramUrl: "@nixrajput" }).instagramUrl,
    ).toBe("https://instagram.com/nixrajput");
    expect(
      submitTestimonialSchema.parse({ ...valid, instagramUrl: "nixrajput" }).instagramUrl,
    ).toBe("https://instagram.com/nixrajput");
  });

  it("keeps a full Instagram URL as-is", () => {
    expect(
      submitTestimonialSchema.parse({
        ...valid,
        instagramUrl: "https://instagram.com/nixrajput",
      }).instagramUrl,
    ).toBe("https://instagram.com/nixrajput");
  });

  it("treats an empty Instagram value as undefined", () => {
    expect(
      submitTestimonialSchema.parse({ ...valid, instagramUrl: "" }).instagramUrl,
    ).toBeUndefined();
  });

  it("rejects an invalid Instagram handle", () => {
    expect(() =>
      submitTestimonialSchema.parse({ ...valid, instagramUrl: "not a handle!" }),
    ).toThrow();
  });

  it("normalizes bare usernames for all social platforms", () => {
    const r = submitTestimonialSchema.parse({
      ...valid,
      linkedinUrl: "nixrajput",
      githubUrl: "nixrajput",
      xUrl: "@nixrajput07",
      instagramUrl: "nixrajput",
    });
    expect(r.linkedinUrl).toBe("https://www.linkedin.com/in/nixrajput");
    expect(r.githubUrl).toBe("https://github.com/nixrajput");
    expect(r.xUrl).toBe("https://x.com/nixrajput07");
    expect(r.instagramUrl).toBe("https://instagram.com/nixrajput");
  });

  it("keeps full social URLs as-is", () => {
    const r = submitTestimonialSchema.parse({
      ...valid,
      githubUrl: "https://github.com/someone",
    });
    expect(r.githubUrl).toBe("https://github.com/someone");
  });

  it("rejects an unsafe (non-http) social URL", () => {
    expect(() =>
      submitTestimonialSchema.parse({ ...valid, githubUrl: "javascript:alert(1)" }),
    ).toThrow();
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
