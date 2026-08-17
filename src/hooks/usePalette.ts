"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, isPaletteId, type PaletteId } from "@/lib/palettes";

/**
 * An external store, not a context provider: getServerSnapshot renders during hydration so
 * there is no mismatch and no setState-in-an-effect (which ESLint rejects here). Applied as
 * `data-palette` on <html>; initial load is handled by the pre-paint script in layout.tsx.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  // Cross-tab: another tab's write fires `storage` here, never in the tab that wrote it.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): PaletteId {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    return isPaletteId(stored) ? stored : DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
}

const getServerSnapshot = (): PaletteId => DEFAULT_PALETTE;

function applyToDocument(palette: PaletteId): void {
  const root = document.documentElement;
  if (palette === DEFAULT_PALETTE) root.removeAttribute("data-palette");
  else root.dataset.palette = palette;
}

export function usePalette(): { palette: PaletteId; setPalette: (next: PaletteId) => void } {
  const palette = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPalette = useCallback((next: PaletteId) => {
    try {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, next);
    } catch {
      // Private browsing can reject writes; the choice still applies for this session.
    }
    applyToDocument(next);
    // `storage` does not fire in the originating tab, so notify this one directly.
    listeners.forEach((l) => l());
  }, []);

  return { palette, setPalette };
}
