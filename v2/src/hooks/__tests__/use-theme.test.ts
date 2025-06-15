import type { Theme } from "@/components/theme/theme-provider";
import { beforeEach, describe, expect, it, mock } from "bun:test";

// Store cleanup functions to run later
const mockCleanupFns: Array<() => void> = [];

// Mock setState function for theme state
const mockSetEffectiveTheme = mock(() => {});

// Mock setTheme function from context
const mockSetTheme = mock((_theme: Theme) => {});

// Mock theme context
const mockThemeContext = {
  theme: "light" as Theme,
  setTheme: mockSetTheme,
};

// Create a mock matchMedia function
const createMatchMedia = (initialMatches: boolean) => {
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  let matches = initialMatches;

  return {
    get matches() {
      return matches;
    },
    media: "",
    addEventListener: (
      type: string,
      listener: (e: { matches: boolean }) => void
    ) => {
      if (type === "change") {
        listeners.push(listener);
      }
    },
    removeEventListener: (
      type: string,
      listener: (e: { matches: boolean }) => void
    ) => {
      if (type === "change") {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    },
    // Helper method for tests to simulate media query change
    simulateChange: (newMatches: boolean) => {
      matches = newMatches;
      listeners.forEach((listener) => listener({ matches }));
    },
  };
};

// Mock window.matchMedia
let mockMatchMedia = createMatchMedia(false);

// Mock React hooks before importing the hook
mock.module("react", () => ({
  useState: <T>(_initialState: T) => [
    "dark" as unknown as T,
    mockSetEffectiveTheme,
  ],
  useContext: () => mockThemeContext,
  useEffect: (effect: () => void | (() => void)) => {
    const cleanup = effect();
    if (typeof cleanup === "function") {
      mockCleanupFns.push(cleanup);
    }
  },
}));

// Mock ThemeProviderContext
mock.module("@/store/theme", () => ({
  ThemeProviderContext: { Provider: mock(), Consumer: mock() },
}));

// Mock window object if it doesn't exist
if (typeof globalThis.window === "undefined") {
  // @ts-expect-error - Mocking window for tests
  globalThis.window = {
    matchMedia: (_query: string) => mockMatchMedia,
  };
} else {
  // @ts-expect-error - Adding matchMedia to window
  globalThis.window.matchMedia = (_query: string) => mockMatchMedia;
}

// Import the hook after mocking dependencies
import { useTheme } from "@/hooks/use-theme";

describe("useTheme Hook", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetState.mockReset();
    mockSetTheme.mockReset();
    mockUseContext.mockReset();
    mockUseEffect.mockReset();
    mockUseState.mockReset();

    // Clear cleanup functions
    mockCleanupFns.length = 0;

    // Reset to default context
    mockUseContext.mockImplementation(() => mockThemeContext);

    // Create mock matchMedia
    mockMatchMedia = createMatchMedia(false);

    // Mock window.matchMedia
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = (query: string) => mockMatchMedia;
  });

  it("throws error when used outside ThemeProvider", () => {
    // Mock context as undefined
    mockUseContext.mockImplementation(() => undefined);

    // Expect the hook to throw an error
    expect(() => useTheme()).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
  });

  it("returns context values and effectiveTheme", () => {
    // Set up context with light theme
    mockUseContext.mockImplementation(() => ({
      theme: "light",
      setTheme: mockSetTheme,
    }));

    // Call the hook
    const result = useTheme();

    // Verify the result
    expect(result).toEqual({
      theme: "light",
      setTheme: mockSetTheme,
      effectiveTheme: "light",
    });
  });

  it("uses explicit theme when theme is 'light'", () => {
    // Set up context with light theme
    mockUseContext.mockImplementation(() => ({
      theme: "light",
      setTheme: mockSetTheme,
    }));

    // Call the hook
    useTheme();

    // Verify setState was called with light theme
    expect(mockSetState).toHaveBeenCalledWith("light");
  });

  it("uses explicit theme when theme is 'dark'", () => {
    // Set up context with dark theme
    mockUseContext.mockImplementation(() => ({
      theme: "dark",
      setTheme: mockSetTheme,
    }));

    // Call the hook
    useTheme();

    // Verify setState was called with dark theme
    expect(mockSetState).toHaveBeenCalledWith("dark");
  });

  it("detects system theme when theme is 'system' and system prefers light", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as light
    mockMatchMedia = createMatchMedia(false);
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Verify setState was called with light theme
    expect(mockSetState).toHaveBeenCalledWith("light");
  });

  it("detects system theme when theme is 'system' and system prefers dark", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as dark
    mockMatchMedia = createMatchMedia(true);
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Verify setState was called with dark theme
    expect(mockSetState).toHaveBeenCalledWith("dark");
  });

  it("updates theme when system preference changes", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as light initially
    mockMatchMedia = createMatchMedia(false);
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Reset setState mock to track new calls
    mockSetState.mockReset();

    // Simulate system preference changing to dark
    mockMatchMedia.simulateChange(true);

    // Verify setState was called with dark theme
    expect(mockSetState).toHaveBeenCalledWith("dark");
  });

  it("cleans up event listener on unmount", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference
    mockMatchMedia = createMatchMedia(false);
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;

    // Spy on removeEventListener
    const removeEventListenerSpy = spyOn(mockMatchMedia, "removeEventListener");

    // Call the hook
    useTheme();

    // Verify cleanup function was registered
    expect(mockCleanupFns.length).toBe(1);

    // Call cleanup function (simulating unmount)
    mockCleanupFns[0]();

    // Verify removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it("updates effectiveTheme when context theme changes", () => {
    // Set up context with light theme initially
    const initialContext = {
      theme: "light" as Theme,
      setTheme: mockSetTheme,
    };
    mockUseContext.mockImplementation(() => initialContext);

    // Call the hook
    useTheme();

    // Verify setState was called with light theme
    expect(mockSetState).toHaveBeenCalledWith("light");

    // Reset setState mock to track new calls
    mockSetState.mockReset();

    // Update context theme to dark
    initialContext.theme = "dark";

    // Simulate dependency array change by calling effect again
    mockUseEffect.mock.calls[0][0]();

    // Verify setState was called with dark theme
    expect(mockSetState).toHaveBeenCalledWith("dark");
  });
});
