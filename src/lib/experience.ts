/**
 * Years of professional experience, from the experience rows rather than GitHub's
 * first-contribution year, which measured how long the account had existed. `period` is a
 * display string ("May 2021 - Jul 2022"), so the start year is its first four-digit year.
 */
export function professionalYears(periods: string[], now = new Date()): number | null {
  const startYears = periods
    .map((p) => p.match(/\b(19|20)\d{2}\b/)?.[0])
    .filter((y): y is string => y !== undefined)
    .map(Number);

  if (startYears.length === 0) return null;
  return Math.max(0, now.getFullYear() - Math.min(...startYears));
}
