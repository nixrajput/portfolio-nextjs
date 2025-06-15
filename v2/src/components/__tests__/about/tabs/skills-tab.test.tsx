import { render, screen } from "@testing-library/react";
import SkillsTab from "@/components/about/tabs/skills-tab";
import { defaultSkillLists } from "@/data";
import type { ISkillList } from "@/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: string;
    loading?: "eager" | "lazy";
    placeholder?: string;
    blurDataURL?: string;
    className?: string;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("SkillsTab", () => {
  it("renders with default skill lists", () => {
    render(<SkillsTab />);

    defaultSkillLists.forEach((skillList) => {
      expect(screen.getByText(skillList.title)).toBeInTheDocument();
      skillList.items.forEach((skill) => {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
        if (skill.icon) {
          expect(screen.getByAltText(`logo-${skill.name}`)).toBeInTheDocument();
        }
      });
    });
  });

  it("renders with custom skill lists", () => {
    const customSkillLists: ISkillList[] = [
      {
        title: "Custom Skills",
        items: [
          {
            name: "Skill 1",
            icon: "/path/to/icon1.png",
            level: "Expert",
          },
          {
            name: "Skill 2",
            icon: "/path/to/icon2.png",
            level: "Intermediate",
          },
        ],
      },
    ];

    render(<SkillsTab skillLists={customSkillLists} />);

    expect(screen.getByText("Custom Skills")).toBeInTheDocument();
    expect(screen.getByText("Skill 1")).toBeInTheDocument();
    expect(screen.getByText("Skill 2")).toBeInTheDocument();
    expect(screen.getByAltText("logo-Skill 1")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const customClass = "custom-class";
    render(<SkillsTab className={customClass} />);

    const container = screen.getByText(defaultSkillLists[0].title).parentElement
      ?.parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("renders badges with correct styling", () => {
    render(<SkillsTab />);

    const badges = screen.getAllByRole("button");
    badges.forEach((badge) => {
      expect(badge).toHaveClass(
        "bg-white/50",
        "dark:bg-neutral-800/50",
        "backdrop-blur-sm",
        "flex",
        "items-center",
        "gap-2",
        "rounded-full"
      );
    });
  });
});
