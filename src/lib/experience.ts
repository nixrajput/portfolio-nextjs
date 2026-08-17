const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Earliest start as [year, monthIndex] from a display period ("May 2021 - Jul 2022"). */
function parseStart(period: string): [number, number] | null {
  const year = period.match(/\b(?:19|20)\d{2}\b/)?.[0];
  if (!year) return null;
  // Month is optional: a period may be just "2021". Only text BEFORE the year counts, or
  // "Jan 2020 - Dec 2021" would pick up December.
  const before = period.slice(0, period.indexOf(year)).toLowerCase();
  const month = MONTHS.findIndex((m) => before.includes(m));
  return [Number(year), month === -1 ? 0 : month];
}

/**
 * From the experience rows, not GitHub's first-contribution year, which measured account age.
 * Counts elapsed MONTHS: subtracting calendar years alone called "Dec 2020 - Present" 6 years
 * on 2 Jan 2026, and this figure is a claim about a person.
 */
export function professionalYears(periods: string[], now = new Date()): number | null {
  const starts = periods.map(parseStart).filter((s): s is [number, number] => s !== null);
  if (starts.length === 0) return null;

  const earliest = starts.reduce((a, b) =>
    a[0] !== b[0] ? (a[0] < b[0] ? a : b) : a[1] <= b[1] ? a : b,
  );
  const months = (now.getFullYear() - earliest[0]) * 12 + (now.getMonth() - earliest[1]);
  return Math.max(0, Math.floor(months / 12));
}
