import { expect, test } from "@playwright/test";

test("testimonial form page loads", async ({ page }) => {
  await page.goto("/testimonials/new");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/share your experience/i);
});

test("honeypot field is present and invisible to users", async ({ page }) => {
  await page.goto("/testimonials/new");
  const honeypot = page.locator('input[name="website"]');
  await expect(honeypot).toHaveCount(1);
  // The honeypot wrapper is positioned off-screen (left: -9999px) + aria-hidden.
  // The input itself isn't display:none but its bounding box should be off-screen.
  const box = await honeypot.boundingBox();
  // Off-screen: x will be deeply negative (around -9999px from viewport)
  const isOffScreen = box === null || box.x < -100;
  expect(isOffScreen).toBe(true);
});

test("form has required fields for name, relationship, and content", async ({ page }) => {
  await page.goto("/testimonials/new");
  await expect(page.getByLabel(/your name/i)).toBeVisible();
  await expect(page.getByLabel(/how do you know me/i)).toBeVisible();
  await expect(page.getByLabel(/your testimonial/i)).toBeVisible();
});
