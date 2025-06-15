import { beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import * as React from "react";

// Mock React hooks
const mockSetState = mock<(value: unknown) => void>(() => {});

// Create a generic useState mock that matches React's useState signature
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

// This implementation handles both overloads of useState
const mockUseState = mock(function useState<S>(initialState?: S | (() => S)) {
  // Default to false when no initialState is provided (for our specific test case)
  const state =
    initialState === undefined
      ? false
      : typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState;
  return [state, mockSetState] as [S, Dispatch<SetStateAction<S>>];
});

const mockUseEffect = mock<
  (effect: () => void | (() => void), deps?: readonly unknown[]) => void
>((effect) => {
  // Execute the effect function immediately in tests
  const cleanup = effect();
  // Store the cleanup function for later use
  if (typeof cleanup === "function") {
    mockCleanupFns.push(cleanup);
  }
});

// Store cleanup functions to run later
const mockCleanupFns: Array<() => void> = [];

// Mock the window object if it doesn't exist
if (typeof globalThis.window === "undefined") {
  // @ts-expect-error - Mocking window for tests
  globalThis.window = {};
}

// Spy on React hooks
spyOn(React, "useState").mockImplementation(mockUseState);
spyOn(React, "useEffect").mockImplementation(mockUseEffect);

// Import the hook after mocking React
import { useIsMobile } from "@/hooks/use-mobile";

describe("useIsMobile Hook", () => {
  let mockMatchMedia: ReturnType<typeof createMockMatchMedia>;

  // Create a mock matchMedia function
  function createMockMatchMedia(initialMatches = false) {
    const listeners: Array<(event: { matches: boolean }) => void> = [];

    const api = {
      matches: initialMatches,
      media: "(max-width: 768px)",
      addEventListener: (
        _type: string,
        listener: (event: { matches: boolean }) => void
      ) => {
        listeners.push(listener);
      },
      removeEventListener: mock(() => {}),
      dispatchEvent: (matches: boolean) => {
        api.matches = matches;
        listeners.forEach((listener) => listener({ matches }));
        return true;
      },
      // These are needed for older browser compatibility
      addListener: mock(() => {}),
      removeListener: mock(() => {}),
    };

    return api;
  }

  beforeEach(() => {
    // Reset mocks before each test
    mockSetState.mockReset();
    mockMatchMedia = createMockMatchMedia();

    // Mock window.matchMedia
    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;
  });

  it("initializes with false by default", () => {
    // Call the hook
    useIsMobile();

    // Verify useState was called with the initial value
    expect(mockUseState).toHaveBeenCalledWith(false);

    // Verify useEffect was called
    expect(mockUseEffect).toHaveBeenCalled();
  });

  it("updates state when media query matches", () => {
    // Create a mock that returns true for matches
    mockMatchMedia = createMockMatchMedia(true);

    // @ts-expect-error - We're intentionally creating a simplified mock
    window.matchMedia = () => mockMatchMedia;

    // Reset setState mock to track new calls
    mockSetState.mockReset();

    // Call the hook
    useIsMobile();

    // Verify setState was called with true
    expect(mockSetState).toHaveBeenCalledWith(true);
  });

  it("updates state when media query changes", () => {
    // Reset setState mock
    mockSetState.mockReset();

    // Call the hook
    useIsMobile();

    // Simulate a media query change
    mockMatchMedia.dispatchEvent(true);

    // Verify setState was called with the new value
    expect(mockSetState).toHaveBeenCalledWith(true);
  });

  it("cleans up event listener on unmount", () => {
    // Create a spy for removeEventListener
    const removeEventListenerSpy = mock(() => {});
    mockMatchMedia.removeEventListener = removeEventListenerSpy;

    // Call the hook
    useIsMobile();

    // Run cleanup functions (simulating unmount)
    mockCleanupFns.forEach((cleanup) => cleanup());

    // Verify removeEventListener was called
    expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThan(0);
  });
});
