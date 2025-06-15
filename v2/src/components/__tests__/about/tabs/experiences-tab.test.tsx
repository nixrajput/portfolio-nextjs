import { render, screen } from "@testing-library/react";
import ExperiencesTab from "@/components/about/tabs/experiences-tab";
import { defaultExperiences } from "@/data";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Mock Timeline component
jest.mock("@/components/ui/timeline", () => {
  return function MockTimeline({ data }: { data: TimelineEntry[] }) {
    return (
      <div data-testid="timeline">
        {data.map((item, index) => (
          <div key={index} data-testid={`timeline-item-${index}`}>
            <div data-testid={`timeline-title-${index}`}>{item.title}</div>
            <div data-testid={`timeline-content-${index}`}>{item.content}</div>
          </div>
        ))}
      </div>
    );
  };
});

describe("ExperiencesTab", () => {
  it("renders with default experiences", () => {
    render(<ExperiencesTab />);

    defaultExperiences.forEach((experience, index) => {
      expect(screen.getByTestId(`timeline-title-${index}`)).toHaveTextContent(
        experience.date
      );
      expect(screen.getByTestId(`timeline-content-${index}`)).toHaveTextContent(
        experience.title
      );
      expect(screen.getByTestId(`timeline-content-${index}`)).toHaveTextContent(
        experience.company
      );
      expect(screen.getByTestId(`timeline-content-${index}`)).toHaveTextContent(
        experience.description
      );
    });
  });

  it("renders with custom experiences", () => {
    const customExperiences = [
      {
        date: "2023",
        title: "Custom Title",
        company: "Custom Company",
        description: "Custom Description",
      },
    ];

    render(<ExperiencesTab experiences={customExperiences} />);

    expect(screen.getByTestId("timeline-title-0")).toHaveTextContent("2023");
    expect(screen.getByTestId("timeline-content-0")).toHaveTextContent(
      "Custom Title"
    );
    expect(screen.getByTestId("timeline-content-0")).toHaveTextContent(
      "Custom Company"
    );
    expect(screen.getByTestId("timeline-content-0")).toHaveTextContent(
      "Custom Description"
    );
  });

  it("renders with custom className", () => {
    const customClass = "custom-class";
    render(<ExperiencesTab className={customClass} />);

    const container = screen.getByTestId("timeline").parentElement;
    expect(container).toHaveClass(customClass);
  });
});
