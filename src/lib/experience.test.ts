import { describe, it, expect } from "vitest";
import { professionalYears } from "./experience";

const NOW = new Date("2026-08-17T00:00:00Z");

describe("professionalYears", () => {
  it("counts from the earliest start year, not the first row", () => {
    // Rows are ordered newest-first in the admin, so the earliest year is not row 0.
    const periods = [
      "Jul 2024 – Present",
      "Feb 2023 – Jul 2024",
      "May 2021 – Jul 2022",
      "Jul 2021 – Nov 2021",
    ];
    expect(professionalYears(periods, NOW)).toBe(5);
  });

  it("handles an en dash, a hyphen, and 'Present' alike", () => {
    expect(professionalYears(["Jan 2020 – Present"], NOW)).toBe(6);
    expect(professionalYears(["Jan 2020 - Dec 2021"], NOW)).toBe(6);
  });

  it("takes the START year when a period spans two years", () => {
    // The second year must not win, or a role ending later shortens the total.
    expect(professionalYears(["May 2021 – Jul 2022"], NOW)).toBe(5);
  });

  it("counts elapsed months, not calendar years", () => {
    // The bug this replaces: subtracting years alone called a one-month-old career 6 years.
    expect(professionalYears(["Dec 2020 - Present"], new Date("2026-01-02"))).toBe(5);
    expect(professionalYears(["Dec 2020 - Present"], new Date("2026-12-02"))).toBe(6);
  });

  it("reads the month before the year, not a later one in the same period", () => {
    // "Jan 2020 - Dec 2021" must start in January; a naive month scan finds December.
    expect(professionalYears(["Jan 2020 - Dec 2021"], new Date("2026-06-01"))).toBe(6);
  });

  it("treats a year with no month as January", () => {
    expect(professionalYears(["2021"], new Date("2026-06-01"))).toBe(5);
  });

  it("picks the earliest by month when two rows share the earliest year", () => {
    expect(professionalYears(["Nov 2021 - x", "Mar 2021 - y"], new Date("2026-06-01"))).toBe(5);
  });

  it("returns null when there is nothing to derive from, so callers can fall back", () => {
    expect(professionalYears([], NOW)).toBeNull();
    expect(professionalYears(["Present", "ongoing"], NOW)).toBeNull();
  });

  it("ignores numbers that are not plausible years", () => {
    expect(professionalYears(["Team of 12 – Present"], NOW)).toBeNull();
    expect(professionalYears(["Team of 12, from Mar 2019"], NOW)).toBe(7);
  });

  it("never returns a negative number for a future-dated row", () => {
    expect(professionalYears(["Jan 2030 – Present"], NOW)).toBe(0);
  });
});
