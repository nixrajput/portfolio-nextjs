import { render, screen, fireEvent } from "@testing-library/react";
import ThemeModeToggle from "@/components/theme/theme-mode-toggle";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: jest.fn(),
    theme: "light",
  }),
}));

describe("ThemeModeToggle", () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {ui}
      </ThemeProvider>
    );
  };

  it("renders without crashing", () => {
    renderWithTheme(<ThemeModeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays the theme toggle button with correct accessibility label", () => {
    renderWithTheme(<ThemeModeToggle />);
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });

  it("shows dropdown menu when clicked", () => {
    renderWithTheme(<ThemeModeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    renderWithTheme(<ThemeModeToggle className={customClass} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("uses custom icon size when provided", () => {
    const iconSize = 24;
    renderWithTheme(<ThemeModeToggle iconSize={iconSize} />);
    const sunIcon = screen.getByTestId("sun-icon");
    const moonIcon = screen.getByTestId("moon-icon");

    expect(sunIcon).toHaveAttribute("size", iconSize.toString());
    expect(moonIcon).toHaveAttribute("size", iconSize.toString());
  });

  it("calls onClick handler when theme is changed", () => {
    const onClickMock = jest.fn();
    renderWithTheme(<ThemeModeToggle onClick={onClickMock} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const darkOption = screen.getByText("Dark");
    fireEvent.click(darkOption);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
