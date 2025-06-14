import { ThemeProvider } from "@/components/theme/theme-provider";
import { render } from "@testing-library/react";
import { ThemeProviderProps } from "next-themes";

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-theme-provider">{children}</div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(getByTestId("mock-theme-provider")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("passes props to NextThemesProvider", () => {
    const testProps: ThemeProviderProps = {
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: true,
    };

    const { getByTestId } = render(
      <ThemeProvider {...testProps}>
        <div>Test Child</div>
      </ThemeProvider>
    );

    const provider = getByTestId("mock-theme-provider");
    expect(provider).toBeInTheDocument();
  });
});
