import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom has no IntersectionObserver; framer-motion's useInView needs one.
// Stub reports "in view" immediately so scroll-triggered content renders.
if (!("IntersectionObserver" in globalThis)) {
  class MockIntersectionObserver {
    constructor(cb: IntersectionObserverCallback) {
      this.cb = cb;
    }
    cb: IntersectionObserverCallback;
    observe(el: Element) {
      this.cb(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
}

// Required env for modules that read it at import time (e.g. SITE.url via
// requireEnv). Set a stable test value so importing route/SEO modules in tests
// never throws on a missing variable.
process.env.NEXT_PUBLIC_SITE_URL ??= "https://nixrajput.com";
