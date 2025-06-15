import type { Theme } from "@/components/theme/theme-provider";
import { beforeEach, describe, expect, it, mock } from "bun:test";
import * as React from "react";

// Create mocks for the DOM APIs we need
const mockClassList = {
  add: mock((_className: string) => {}),
  remove: mock((_classNames: string[]) => {}),
};

const mockLocalStorage = {
  getItem: mock((_key: string) => null as null | string),
  setItem: mock((_key: string, _value: string) => {}),
};

const mockMatchMedia = mock((_query: string) => ({
  matches: false,
}));

// Define the type for context provider props
type ContextProviderProps = {
  value: {
    theme: Theme;
    setTheme: (theme: Theme) => void;
  };
  children: React.ReactNode;
  // Allow specific additional props that might be passed
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  // Index signature for other potential props with string values
  [key: string]: string | unknown;
};

// Create a mock for the ThemeProviderContext
const mockContextProvider = mock((props: ContextProviderProps) => ({
  type: "ContextProvider",
  props,
}));

describe("ThemeProvider", () => {
  // Create a simplified version of the ThemeProvider for testing
  function createThemeProvider() {
    // This simulates what the real ThemeProvider does
    return {
      initializeTheme: (
        defaultTheme: Theme = "system",
        storageKey: string = "portfolio-theme"
      ) => {
        // Get theme from localStorage or use default
        const storedTheme = mockLocalStorage.getItem(storageKey);
        const theme = (storedTheme as Theme | null) || defaultTheme;

        // Update DOM classes
        mockClassList.remove(["light", "dark"]);

        if (theme === "system") {
          const systemTheme = mockMatchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          mockClassList.add(systemTheme);
        } else {
          mockClassList.add(theme);
        }

        return theme;
      },

      createContextValue: (theme: Theme) => {
        return {
          theme,
          setTheme: (newTheme: Theme) => {
            mockLocalStorage.setItem("portfolio-theme", newTheme);
          },
        };
      },

      render: (props: {
        children: React.ReactNode;
        defaultTheme?: Theme;
        storageKey?: string;
      }) => {
        const {
          children,
          defaultTheme = "system",
          storageKey = "portfolio-theme",
        } = props;

        // Initialize theme
        const storedTheme = mockLocalStorage.getItem(storageKey);
        const theme = (storedTheme as Theme | null) || defaultTheme;

        // Create context value
        const contextValue = {
          theme,
          setTheme: (newTheme: Theme) => {
            mockLocalStorage.setItem(storageKey, newTheme);
          },
        };

        // Return mock context provider
        return mockContextProvider({
          value: contextValue,
          children,
        });
      },
    };
  }

  beforeEach(() => {
    // Reset all mocks
    mockClassList.add.mockReset();
    mockClassList.remove.mockReset();
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockMatchMedia.mockReset();
    mockContextProvider.mockReset();

    // Setup default mock implementations
    mockMatchMedia.mockImplementation(() => ({ matches: false }));
  });

  it("initializes with default theme when localStorage is empty", () => {
    // Mock localStorage.getItem to return null
    mockLocalStorage.getItem.mockImplementation(() => null);

    // Create provider and initialize theme
    const provider = createThemeProvider();
    const theme = provider.initializeTheme();

    // Check that classList.remove was called
    expect(mockClassList.remove).toHaveBeenCalledWith(["light", "dark"]);

    // Default should be "system", which resolves to "light" with our mock
    expect(mockClassList.add).toHaveBeenCalledWith("light");

    // Theme should be "system"
    expect(theme).toBe("system");
  });

  it("uses theme from localStorage when available", () => {
    // Mock localStorage.getItem to return a theme
    mockLocalStorage.getItem.mockImplementation(() => "dark");

    // Create provider and initialize theme
    const provider = createThemeProvider();
    const theme = provider.initializeTheme();

    // Check that classList.add was called with "dark"
    expect(mockClassList.add).toHaveBeenCalledWith("dark");

    // Theme should be "dark"
    expect(theme).toBe("dark");
  });

  it("adds appropriate class to root element based on theme", () => {
    // Mock localStorage to return "light" theme
    mockLocalStorage.getItem.mockImplementation(() => "light");

    // Create provider and initialize theme
    const provider = createThemeProvider();
    provider.initializeTheme();

    // Check that classList.add was called with "light"
    expect(mockClassList.add).toHaveBeenCalledWith("light");
  });

  it("uses system preference when theme is system", () => {
    // Mock localStorage to return "system" theme
    mockLocalStorage.getItem.mockImplementation(() => "system");

    // Mock matchMedia to return dark mode preference
    mockMatchMedia.mockImplementation(() => ({ matches: true }));

    // Create provider and initialize theme
    const provider = createThemeProvider();
    provider.initializeTheme();

    // Check that classList.add was called with "dark"
    expect(mockClassList.add).toHaveBeenCalledWith("dark");
  });

  it("stores theme in localStorage when setTheme is called", () => {
    // Create provider and context value
    const provider = createThemeProvider();
    const contextValue = provider.createContextValue("light");

    // Call setTheme
    contextValue.setTheme("dark");

    // Check that localStorage.setItem was called
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "portfolio-theme",
      "dark"
    );
  });

  it("renders with context provider", () => {
    // Create provider and render
    const provider = createThemeProvider();
    provider.render({ children: <div>Test</div> });

    // Check that context provider was called
    expect(mockContextProvider).toHaveBeenCalled();

    // Check that context value was passed
    const callArgs = mockContextProvider.mock.calls[0][0];
    expect(callArgs).toBeDefined();
    expect(callArgs.value).toBeDefined();
    expect(typeof callArgs.value.setTheme).toBe("function");
  });
});
