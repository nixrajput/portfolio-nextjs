import { expect, test } from "@playwright/test";

test("homepage loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Nikhil Rajput/);
});

test("hero section h1 is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("key section anchors exist in the DOM", async ({ page }) => {
  await page.goto("/");
  // The page uses id-based anchors for the single-page sections
  await expect(page.locator("#hero")).toBeAttached();
  await expect(page.locator("#projects")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();
});
