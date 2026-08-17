import { BRAND } from "@/lib/brand";

// These ramps drive the picker swatches while globals.css applies the actual tokens;
// globals.theme.test.ts asserts they match, so a mismatch cannot show one colour and apply
// another. Iris takes its ramp from brand.ts rather than repeating it here.
export const DEFAULT_PALETTE = "iris";

export type PaletteId = "iris" | "glacier" | "ember" | "verdant" | "magenta";

export const PALETTES: ReadonlyArray<{
  id: PaletteId;
  label: string;
  ramp: readonly [string, string, string];
}> = [
  { id: "iris", label: "Iris", ramp: [BRAND.deep, BRAND.mid, BRAND.bright] },
  { id: "glacier", label: "Glacier", ramp: ["#155e75", "#0891b2", "#22d3ee"] },
  { id: "ember", label: "Ember", ramp: ["#7c2d12", "#d97706", "#fbbf24"] },
  { id: "verdant", label: "Verdant", ramp: ["#14532d", "#059669", "#34d399"] },
  { id: "magenta", label: "Magenta", ramp: ["#831843", "#db2777", "#fb7185"] },
];

export const PALETTE_IDS = PALETTES.map((p) => p.id);

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && (PALETTE_IDS as string[]).includes(value);
}

// Also hardcoded in the pre-paint script in layout.tsx - keep the two in sync.
export const PALETTE_STORAGE_KEY = "palette";
