import { expect, test } from "@playwright/test";

test("appearance popover offers theme and palette choices", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /appearance settings/i }).click();

  // Theme is a segmented control now, not a cycling button: all three states must be
  // present, since the point of the change was that "System" is reachable in one click.
  for (const mode of ["Light", "Dark", "System"]) {
    await expect(page.getByRole("button", { name: mode, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Iris", exact: true })).toBeVisible();
});

test("choosing a palette applies it and survives a reload", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /appearance settings/i }).click();
  await page.getByRole("button", { name: "Ember", exact: true }).click();

  await expect(page.locator("html")).toHaveAttribute("data-palette", "ember");

  // The pre-paint script in layout.tsx is what makes this survive; without it the page
  // renders the default for a frame and then snaps.
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-palette", "ember");
});

test("returning to the default palette removes the override attribute", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /appearance settings/i }).click();
  await page.getByRole("button", { name: "Verdant", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-palette", "verdant");

  await page.getByRole("button", { name: "Iris", exact: true }).click();
  // Iris lives in :root, so the default is the ABSENCE of the attribute rather than
  // data-palette="iris" - a second definition that could drift from the first.
  await expect(page.locator("html")).not.toHaveAttribute("data-palette", /.*/);
});

test("mobile hamburger opens the nav menu", async ({ page }) => {
  // Simulate a mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const hamburger = page.getByRole("button", { name: /open menu/i });
  await expect(hamburger).toBeVisible();
  await hamburger.click();

  // The full-screen menu overlay dialog should appear
  await expect(page.getByRole("dialog", { name: /navigation/i })).toBeVisible();
});
