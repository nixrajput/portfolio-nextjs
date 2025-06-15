import { beforeEach, describe, expect, it, mock, spyOn } from "bun:test";

// Store cleanup functions to run later
const mockCleanupFns: Array<() => void> = [];

// Mock setState function for theme state
const mockSetEffectiveTheme = mock(() => {});

// Mock setTheme function from context
const mockSetTheme = mock((_theme: "dark" | "light" | "system") => {});

// Mock React hooks
const mockUseState = mock();
const mockUseContext = mock();
const mockUseEffect = mock();

// Mock theme context
const mockThemeContext = {
  theme: "light" as "dark" | "light" | "system",
  setTheme: mockSetTheme,
};

// Create a mock matchMedia function
const createMatchMedia = (initialMatches: boolean) => {
  const listeners: Array<
    (this: MediaQueryList, ev: MediaQueryListEvent) => void
  > = [];
  let matches = initialMatches;

  const mockMediaQueryList: MediaQueryList & {
    simulateChange: (newMatches: boolean) => void;
  } = {
    get matches() {
      return matches;
    },
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: (
      type: string,
      listener: EventListenerOrEventListenerObject,
      _options?: boolean | AddEventListenerOptions
    ) => {
      if (type === "change" && typeof listener === "function") {
        listeners.push(
          listener as (this: MediaQueryList, ev: MediaQueryListEvent) => void
        );
      }
    },
    removeEventListener: (
      type: string,
      listener: EventListenerOrEventListenerObject,
      _options?: boolean | EventListenerOptions
    ) => {
      if (type === "change" && typeof listener === "function") {
        const index = listeners.indexOf(
          listener as (this: MediaQueryList, ev: MediaQueryListEvent) => void
        );
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    },
    // Legacy methods for older browsers
    addListener: (
      listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
    ) => {
      listeners.push(listener);
    },
    removeListener: (
      listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
    ) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    },
    dispatchEvent: (_event: Event) => {
      return true;
    },
    // Helper method for tests to simulate media query change
    simulateChange: (newMatches: boolean) => {
      matches = newMatches;
      const event = { matches } as MediaQueryListEvent;
      listeners.forEach((listener) => listener.call(mockMediaQueryList, event));
    },
  };

  return mockMediaQueryList;
};

// Mock window.matchMedia
let mockMatchMedia = createMatchMedia(false);

// Mock React hooks before importing the hook
mock.module("react", () => ({
  useState: mockUseState.mockImplementation(<T>(initialState: T) => [
    initialState,
    mockSetEffectiveTheme,
  ]),
  useContext: mockUseContext.mockImplementation(() => mockThemeContext),
  useEffect: mockUseEffect.mockImplementation(
    (effect: () => void | (() => void)) => {
      const cleanup = effect();
      if (typeof cleanup === "function") {
        mockCleanupFns.push(cleanup);
      }
    }
  ),
}));

// Mock ThemeProviderContext
mock.module("@/store/theme", () => ({
  ThemeProviderContext: { Provider: mock(), Consumer: mock() },
}));

// Mock window object if it doesn't exist
if (typeof globalThis.window === "undefined") {
  // @ts-expect-error - Creating minimal window mock for tests
  globalThis.window = {
    matchMedia: (_query: string) => mockMatchMedia,
  };
} else {
  globalThis.window.matchMedia = (_query: string) => mockMatchMedia;
}

// Import the hook after mocking dependencies
import { useTheme } from "@/hooks/use-theme";

describe("useTheme Hook", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetEffectiveTheme.mockReset();
    mockSetTheme.mockReset();
    mockUseContext.mockReset();
    mockUseEffect.mockReset();
    mockUseState.mockReset();

    // Clear cleanup functions
    mockCleanupFns.length = 0;

    // Reset to default context
    mockUseContext.mockImplementation(() => mockThemeContext);

    // Reset useState to return initial state and setter
    mockUseState.mockImplementation(<T>(initialState: T) => [
      initialState,
      mockSetEffectiveTheme,
    ]);

    // Reset useEffect to execute effects immediately
    mockUseEffect.mockImplementation((effect: () => void | (() => void)) => {
      const cleanup = effect();
      if (typeof cleanup === "function") {
        mockCleanupFns.push(cleanup);
      }
    });

    // Create mock matchMedia
    mockMatchMedia = createMatchMedia(false);

    // Mock window.matchMedia
    globalThis.window.matchMedia = (_query: string) => mockMatchMedia;
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

    // Mock useState to return "light" as effective theme
    mockUseState.mockImplementation(() => ["light", mockSetEffectiveTheme]);

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

    // Verify setEffectiveTheme was called with light theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("light");
  });

  it("uses explicit theme when theme is 'dark'", () => {
    // Set up context with dark theme
    mockUseContext.mockImplementation(() => ({
      theme: "dark",
      setTheme: mockSetTheme,
    }));

    // Call the hook
    useTheme();

    // Verify setEffectiveTheme was called with dark theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("dark");
  });

  it("detects system theme when theme is 'system' and system prefers light", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as light
    mockMatchMedia = createMatchMedia(false);
    globalThis.window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Verify setEffectiveTheme was called with light theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("light");
  });

  it("detects system theme when theme is 'system' and system prefers dark", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as dark
    mockMatchMedia = createMatchMedia(true);
    globalThis.window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Verify setEffectiveTheme was called with dark theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("dark");
  });

  it("updates theme when system preference changes", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference as light initially
    mockMatchMedia = createMatchMedia(false);
    globalThis.window.matchMedia = () => mockMatchMedia;

    // Call the hook
    useTheme();

    // Reset setEffectiveTheme mock to track new calls
    mockSetEffectiveTheme.mockReset();

    // Simulate system preference changing to dark
    mockMatchMedia.simulateChange(true);

    // Verify setEffectiveTheme was called with dark theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("dark");
  });

  it("cleans up event listener on unmount", () => {
    // Set up context with system theme
    mockUseContext.mockImplementation(() => ({
      theme: "system",
      setTheme: mockSetTheme,
    }));

    // Mock system preference
    mockMatchMedia = createMatchMedia(false);
    globalThis.window.matchMedia = () => mockMatchMedia;

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
      theme: "light" as "dark" | "light" | "system",
      setTheme: mockSetTheme,
    };
    mockUseContext.mockImplementation(() => initialContext);

    // Call the hook
    useTheme();

    // Verify setEffectiveTheme was called with light theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("light");

    // Reset setEffectiveTheme mock to track new calls
    mockSetEffectiveTheme.mockReset();

    // Update context theme to dark
    initialContext.theme = "dark";

    // Simulate dependency array change by calling effect again
    if (mockUseEffect.mock.calls.length > 0) {
      mockUseEffect.mock.calls[0][0]();
    }

    // Verify setEffectiveTheme was called with dark theme
    expect(mockSetEffectiveTheme).toHaveBeenCalledWith("dark");
  });
});
