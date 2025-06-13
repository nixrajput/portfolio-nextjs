import { render } from "@testing-library/react";
import PageWrapper from "@/components/common/page-wrapper";

describe("PageWrapper", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <PageWrapper>
        <div>Test Content</div>
      </PageWrapper>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <PageWrapper>
        <div>Test Content</div>
      </PageWrapper>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default className", () => {
    const { container } = render(
      <PageWrapper>
        <div>Test Content</div>
      </PageWrapper>
    );
    expect(container.firstChild).toHaveClass("relative", "w-full");
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const { container } = render(
      <PageWrapper className={customClass}>
        <div>Test Content</div>
      </PageWrapper>
    );
    expect(container.firstChild).toHaveClass(customClass);
  });

  it("combines default and custom className", () => {
    const customClass = "custom-class";
    const { container } = render(
      <PageWrapper className={customClass}>
        <div>Test Content</div>
      </PageWrapper>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("relative", "w-full", customClass);
  });
});
