import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "@/components/common/back-button";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  const mockRouter = {
    back: jest.fn(),
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    // Mock window.history
    Object.defineProperty(window, "history", {
      value: {
        length: 2,
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<BackButton />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    const customLabel = "Go Back";
    render(<BackButton label={customLabel} />);
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;
    render(<BackButton icon={<CustomIcon />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("hides icon when showIcon is false", () => {
    render(<BackButton showIcon={false} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("calls router.back() when history length > 1", () => {
    render(<BackButton />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("calls router.replace('/') when history length <= 1", () => {
    Object.defineProperty(window, "history", {
      value: {
        length: 1,
      },
      writable: true,
    });
    render(<BackButton />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockRouter.replace).toHaveBeenCalledWith("/");
  });

  it("calls custom onClick handler when provided", () => {
    const onClickMock = jest.fn();
    render(<BackButton onClick={onClickMock} />);
    fireEvent.click(screen.getByText("Back"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<BackButton className={customClass} />);
    expect(screen.getByText("Back")).toHaveClass(customClass);
  });

  it("handles navigation error gracefully", () => {
    mockRouter.back.mockImplementation(() => {
      throw new Error("Navigation error");
    });
    render(<BackButton />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockRouter.replace).toHaveBeenCalledWith("/");
  });
});
