import { describe, expect, it } from "vitest";
import { GET } from "../llms.txt/route";

describe("llms.txt", () => {
  it("serves plain text with the entity-first identity and FAQ", async () => {
    const res = GET();
    expect(res.headers.get("Content-Type")).toMatch(/text\/plain/);
    const text = await res.text();
    expect(text).toContain("Nikhil Rajput");
    expect(text).toContain("## FAQ");
    expect(text).toContain("llms-full.txt");
  });

  it("contains the identity section", async () => {
    const res = GET();
    const text = await res.text();
    expect(text).toContain("## Identity");
    expect(text).toContain("nixrajput");
    expect(text).toContain("NixLab");
  });

  it("contains GitHub link", async () => {
    const res = GET();
    const text = await res.text();
    expect(text).toContain("github.com/nixrajput");
  });

  it("contains at least one FAQ question", async () => {
    const res = GET();
    const text = await res.text();
    expect(text).toContain("Who is Nikhil Rajput?");
  });
});
