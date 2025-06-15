import type { Experience, ISkillList, Skill, SocialLink, Stat } from "@/types";
import { describe, expect, it } from "bun:test";

// Mock React component for testing SocialLink
const MockIcon = ({ className }: { className?: string }): JSX.Element => {
  // Return a simple JSX element for testing
  return {
    type: "span",
    props: { children: `MockIcon-${className}` },
  } as JSX.Element;
};

describe("Types", () => {
  describe("Experience interface", () => {
    it("should have all required properties", () => {
      const experience: Experience = {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        date: "2023 - Present",
        description: "Leading development of web applications",
      };

      expect(experience).toHaveProperty("title");
      expect(experience).toHaveProperty("company");
      expect(experience).toHaveProperty("date");
      expect(experience).toHaveProperty("description");
    });

    it("should accept string values for all properties", () => {
      const experience: Experience = {
        title: "Frontend Developer",
        company: "StartupXYZ",
        date: "Jan 2022 - Dec 2023",
        description:
          "Built responsive web interfaces using React and TypeScript",
      };

      expect(typeof experience.title).toBe("string");
      expect(typeof experience.company).toBe("string");
      expect(typeof experience.date).toBe("string");
      expect(typeof experience.description).toBe("string");
    });

    it("should work with empty strings", () => {
      const experience: Experience = {
        title: "",
        company: "",
        date: "",
        description: "",
      };

      expect(experience.title).toBe("");
      expect(experience.company).toBe("");
      expect(experience.date).toBe("");
      expect(experience.description).toBe("");
    });
  });

  describe("SocialLink interface", () => {
    it("should have all required properties", () => {
      const socialLink: SocialLink = {
        href: "https://github.com/username",
        icon: MockIcon,
        label: "GitHub",
      };

      expect(socialLink).toHaveProperty("href");
      expect(socialLink).toHaveProperty("icon");
      expect(socialLink).toHaveProperty("label");
    });

    it("should have optional external property", () => {
      const internalLink: SocialLink = {
        href: "/about",
        icon: MockIcon,
        label: "About",
      };

      const externalLink: SocialLink = {
        href: "https://twitter.com/username",
        icon: MockIcon,
        label: "Twitter",
        external: true,
      };

      expect(internalLink.external).toBeUndefined();
      expect(externalLink.external).toBe(true);
    });

    it("should accept React component for icon", () => {
      const socialLink: SocialLink = {
        href: "https://linkedin.com/in/username",
        icon: MockIcon,
        label: "LinkedIn",
      };

      expect(typeof socialLink.icon).toBe("function");
      expect(socialLink.icon).toBe(MockIcon);
    });

    it("should work with different href formats", () => {
      const links: SocialLink[] = [
        { href: "https://example.com", icon: MockIcon, label: "External" },
        { href: "/internal", icon: MockIcon, label: "Internal" },
        { href: "mailto:test@example.com", icon: MockIcon, label: "Email" },
        { href: "tel:+1234567890", icon: MockIcon, label: "Phone" },
      ];

      links.forEach((link) => {
        expect(typeof link.href).toBe("string");
        expect(link.href.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Skill interface", () => {
    it("should have all required properties", () => {
      const skill: Skill = {
        name: "TypeScript",
        icon: "typescript-icon",
        level: "Advanced",
      };

      expect(skill).toHaveProperty("name");
      expect(skill).toHaveProperty("icon");
      expect(skill).toHaveProperty("level");
    });

    it("should accept string values for all properties", () => {
      const skill: Skill = {
        name: "React",
        icon: "react-logo",
        level: "Expert",
      };

      expect(typeof skill.name).toBe("string");
      expect(typeof skill.icon).toBe("string");
      expect(typeof skill.level).toBe("string");
    });

    it("should work with different skill levels", () => {
      const skills: Skill[] = [
        { name: "JavaScript", icon: "js-icon", level: "Expert" },
        { name: "Python", icon: "python-icon", level: "Intermediate" },
        { name: "Go", icon: "go-icon", level: "Beginner" },
      ];

      skills.forEach((skill) => {
        expect(typeof skill.level).toBe("string");
        expect(skill.level.length).toBeGreaterThan(0);
      });
    });
  });

  describe("ISkillList interface", () => {
    it("should have all required properties", () => {
      const skillList: ISkillList = {
        title: "Frontend Technologies",
        items: [
          { name: "React", icon: "react-icon", level: "Advanced" },
          { name: "Vue", icon: "vue-icon", level: "Intermediate" },
        ],
      };

      expect(skillList).toHaveProperty("title");
      expect(skillList).toHaveProperty("items");
    });

    it("should accept array of Skill objects", () => {
      const skillList: ISkillList = {
        title: "Backend Technologies",
        items: [
          { name: "Node.js", icon: "node-icon", level: "Advanced" },
          { name: "Express", icon: "express-icon", level: "Advanced" },
          { name: "MongoDB", icon: "mongo-icon", level: "Intermediate" },
        ],
      };

      expect(Array.isArray(skillList.items)).toBe(true);
      expect(skillList.items).toHaveLength(3);

      skillList.items.forEach((item) => {
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("icon");
        expect(item).toHaveProperty("level");
      });
    });

    it("should work with empty items array", () => {
      const skillList: ISkillList = {
        title: "Future Skills",
        items: [],
      };

      expect(Array.isArray(skillList.items)).toBe(true);
      expect(skillList.items).toHaveLength(0);
    });

    it("should maintain type safety for nested Skill objects", () => {
      const skillList: ISkillList = {
        title: "DevOps Tools",
        items: [
          { name: "Docker", icon: "docker-icon", level: "Intermediate" },
          { name: "Kubernetes", icon: "k8s-icon", level: "Beginner" },
        ],
      };

      skillList.items.forEach((skill) => {
        expect(typeof skill.name).toBe("string");
        expect(typeof skill.icon).toBe("string");
        expect(typeof skill.level).toBe("string");
      });
    });
  });

  describe("Stat interface", () => {
    it("should have all required properties", () => {
      const stat: Stat = {
        label: "Projects Completed",
        count: 42,
      };

      expect(stat).toHaveProperty("label");
      expect(stat).toHaveProperty("count");
    });

    it("should accept number for count", () => {
      const stat: Stat = {
        label: "Years of Experience",
        count: 5,
      };

      expect(typeof stat.label).toBe("string");
      expect(typeof stat.count).toBe("number");
      expect(stat.count).toBe(5);
    });

    it("should accept string for count", () => {
      const stat: Stat = {
        label: "Current Status",
        count: "Available",
      };

      expect(typeof stat.label).toBe("string");
      expect(typeof stat.count).toBe("string");
      expect(stat.count).toBe("Available");
    });

    it("should work with different count formats", () => {
      const stats: Stat[] = [
        { label: "GitHub Stars", count: 1250 },
        { label: "Coffee Cups", count: "∞" },
        { label: "Bug Fixes", count: 999 },
        { label: "Status", count: "Active" },
      ];

      stats.forEach((stat) => {
        expect(typeof stat.label).toBe("string");
        expect(
          typeof stat.count === "string" || typeof stat.count === "number"
        ).toBe(true);
      });
    });

    it("should handle zero and negative numbers", () => {
      const stats: Stat[] = [
        { label: "Bugs in Production", count: 0 },
        { label: "Technical Debt", count: -1 }, // Negative as improvement
      ];

      expect(stats[0].count).toBe(0);
      expect(stats[1].count).toBe(-1);
    });
  });

  describe("Type composition and integration", () => {
    it("should work together in complex data structures", () => {
      const portfolioData = {
        experience: {
          title: "Full Stack Developer",
          company: "Tech Solutions Inc",
          date: "2022 - Present",
          description: "Developing scalable web applications",
        } as Experience,

        socialLinks: [
          {
            href: "https://github.com/dev",
            icon: MockIcon,
            label: "GitHub",
            external: true,
          },
          { href: "/contact", icon: MockIcon, label: "Contact" },
        ] as SocialLink[],

        skillCategories: [
          {
            title: "Frontend",
            items: [
              { name: "React", icon: "react", level: "Expert" },
              { name: "TypeScript", icon: "ts", level: "Advanced" },
            ],
          },
          {
            title: "Backend",
            items: [{ name: "Node.js", icon: "node", level: "Advanced" }],
          },
        ] as ISkillList[],

        stats: [
          { label: "Projects", count: 25 },
          { label: "Experience", count: "3+ years" },
        ] as Stat[],
      };

      // Verify the structure
      expect(portfolioData.experience).toHaveProperty("title");
      expect(Array.isArray(portfolioData.socialLinks)).toBe(true);
      expect(Array.isArray(portfolioData.skillCategories)).toBe(true);
      expect(Array.isArray(portfolioData.stats)).toBe(true);

      // Verify nested structures
      expect(portfolioData.skillCategories[0].items[0]).toHaveProperty("name");
      expect(typeof portfolioData.stats[0].count).toBe("number");
      expect(typeof portfolioData.stats[1].count).toBe("string");
    });
  });
});
