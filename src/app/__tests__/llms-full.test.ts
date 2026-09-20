import { describe, expect, it, vi } from "vitest";

// Every section reads the DB through the homepage loaders; mock them so the test needs no
// database and so the assertions pin that the output comes from that data, not from prose.
vi.mock("@/lib/queries", () => ({
  getProfile: async () => ({
    name: "Nikhil Rajput",
    bio: "Bio paragraph from the database.",
    roles: ["SDE-1", "Open Source Contributor"],
    avatarUrl: "",
    resumeUrl: "",
    heroTagline: null,
    sectionVisibility: { skills: false },
    stats: { years: 5, repos: 77, stars: 631, followers: 114 },
  }),
  getProjectsMerged: async () => [
    {
      repo: "flutter_carousel_widget",
      title: "Flutter Carousel Widget",
      description: "A customizable Flutter carousel widget.",
      stars: 47,
      tags: ["Carousel"],
      featured: true,
      htmlUrl: "https://github.com/nixrajput/flutter_carousel_widget",
    },
  ],
  getExperiences: async () => [
    {
      role: "Software Development Engineer",
      org: "StarApps Studio",
      period: "Jul 2024 - Present",
      location: "Pune, India",
      isCurrent: true,
      description: ["Leading AI integration."],
    },
  ],
  getSkills: async () => [{ name: "Should not render", category: "Hidden", iconPath: "" }],
  getFaqs: async () => [
    { id: 1, question: "Who is Nikhil Rajput?", answer: "An engineer.", order: 0 },
  ],
}));

import { GET } from "../llms-full.txt/route";

describe("llms-full.txt", () => {
  it("renders identity, bio, stats, projects and experience from the loaders", async () => {
    const text = await (await GET()).text();
    expect(text).toContain("# Nikhil Rajput - Full Profile");
    expect(text).toContain("SDE-1 · Open Source Contributor");
    expect(text).toContain("Software Development Engineer at StarApps Studio (Jul 2024 - Present)");
    expect(text).toContain("Bio paragraph from the database.");
    expect(text).toContain("**GitHub stars across owned repositories:** 631");
    expect(text).toContain(
      "**Flutter Carousel Widget** (featured) - A customizable Flutter carousel widget. (47 GitHub stars)",
    );
    expect(text).toContain(
      "- **Software Development Engineer** - StarApps Studio, Pune, India · Jul 2024 - Present",
    );
    expect(text).toContain("  - Leading AI integration.");
    expect(text).toContain("### Who is Nikhil Rajput?");
  });

  it("omits sections the admin has hidden, like the homepage does", async () => {
    const text = await (await GET()).text();
    expect(text).not.toContain("Should not render");
  });

  it("carries no hand-typed figures or projects", async () => {
    const text = await (await GET()).text();
    for (const stale of ["1 000+", "100 000+", "nx-admin", "NixLab Blog", "five years"]) {
      expect(text).not.toContain(stale);
    }
  });
});
