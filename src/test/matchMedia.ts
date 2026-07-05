import { vi } from "vitest";

/**
 * Installs a window.matchMedia mock (jsdom has none). Per-query matches are
 * looked up in `map`; unlisted queries match false. Returns the mock so tests
 * can assert on it. Mirrors the inline factory used by Reveal.test.tsx.
 */
export function installMatchMedia(map: Record<string, boolean> = {}) {
  const mock = vi.fn().mockImplementation((query: string) => ({
    matches: map[query] ?? false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  Object.defineProperty(window, "matchMedia", { writable: true, value: mock });
  return mock;
}
