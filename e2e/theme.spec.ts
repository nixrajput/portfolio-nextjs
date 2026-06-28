import { expect, test } from "@playwright/test";

test("theme toggle button is present and clickable", async ({ page }) => {
  await page.goto("/");

  // The ThemeToggle aria-label is "Theme: <current>. Switch to <next>."
  const toggle = page.getByRole("button", { name: /theme/i }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();

  // After click the html element should still exist — we just verify no crash
  await expect(page.locator("html")).toBeVisible();
});

test("mobile hamburger opens the nav menu", async ({ page }) => {
  // Simulate a mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const hamburger = page.getByRole("button", { name: /open menu/i });
  await expect(hamburger).toBeVisible();
  await hamburger.click();

  // The mobile overlay dialog should appear
  await expect(page.getByRole("dialog", { name: /navigation menu/i })).toBeVisible();
});
