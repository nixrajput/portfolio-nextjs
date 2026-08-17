// globals.css mirrors these as CSS variables by hand (CSS cannot import TS) and
// globals.theme.test.ts fails if the two drift. Consumers that cannot read a CSS variable
// import from here instead: opengraph-image, manifest, notify. See AGENTS.md.

export const BRAND = {
  deep: "#3730a3",
  mid: "#7c3aed",
  bright: "#c084fc",
} as const;

export const GROUND = {
  light: "#f8f7fb",
  dark: "#0a0813",
} as const;

export const INK = {
  light: "#18162b",
  dark: "#ece9f7",
} as const;

export function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function brandRgba(hex: string, alpha: number): string {
  return `rgba(${hexToRgb(hex).join(",")},${alpha})`;
}
