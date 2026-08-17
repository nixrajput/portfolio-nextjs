import { describe, it, expect } from "vitest";
import { projectInsertSchema } from "./schemas";

const base = { repo: "my-repo", title: "My Repo" };

describe("projectInsertSchema media URLs", () => {
  // These fields render as an <img src>, and z.string().url() accepts javascript: and data:
  // where z.httpUrl() does not. The rest of this file already uses httpUrl(); these two
  // originally did not, so the difference is asserted rather than assumed.
  const hostile = [
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:x",
    "file:///etc/passwd",
  ];

  it.each(hostile)("rejects %s as a coverImage", (url) => {
    expect(projectInsertSchema.safeParse({ ...base, coverImage: url }).success).toBe(false);
  });

  it.each(hostile)("rejects %s in screenshots", (url) => {
    expect(projectInsertSchema.safeParse({ ...base, screenshots: [url] }).success).toBe(false);
  });

  it("accepts http(s) URLs", () => {
    const r = projectInsertSchema.safeParse({
      ...base,
      coverImage: "https://cdn.example.com/cover.webp",
      screenshots: ["https://cdn.example.com/1.webp", "http://cdn.example.com/2.webp"],
    });
    expect(r.success).toBe(true);
  });

  it("treats a cleared upload field as null rather than failing", () => {
    const r = projectInsertSchema.safeParse({ ...base, coverImage: "" });
    expect(r.success).toBe(true);
    expect(r.success && r.data.coverImage).toBeNull();
  });

  it("caps screenshots at six", () => {
    const six = Array.from({ length: 6 }, (_, i) => `https://cdn.example.com/${i}.webp`);
    expect(projectInsertSchema.safeParse({ ...base, screenshots: six }).success).toBe(true);
    expect(
      projectInsertSchema.safeParse({
        ...base,
        screenshots: [...six, "https://cdn.example.com/7.webp"],
      }).success,
    ).toBe(false);
  });

  it("still rejects a repo value that is a URL rather than a slug", () => {
    const r = projectInsertSchema.safeParse({ ...base, repo: "https://github.com/x/y" });
    expect(r.success).toBe(false);
  });
});
