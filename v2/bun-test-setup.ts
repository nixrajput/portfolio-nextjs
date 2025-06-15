/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeAll } from "bun:test";
import { JSDOM } from "jsdom";

// Set up DOM environment for testing
beforeAll(() => {
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
    url: "http://localhost:3000",
    pretendToBeVisual: true,
    resources: "usable",
  });

  // Set up global DOM objects
  (global as any).window = dom.window;
  (global as any).document = dom.window.document;
  (global as any).navigator = dom.window.navigator;
  (global as any).HTMLElement = dom.window.HTMLElement;
  (global as any).Element = dom.window.Element;
  (global as any).Node = dom.window.Node;
  (global as any).DocumentFragment = dom.window.DocumentFragment;

  // Mock window.matchMedia for theme detection
  Object.defineProperty(dom.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock ResizeObserver
  (global as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mock IntersectionObserver
  (global as any).IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    get root() {
      return null;
    }
    get rootMargin() {
      return "0px";
    }
    get thresholds() {
      return [];
    }
    takeRecords() {
      return [];
    }
  };
});
