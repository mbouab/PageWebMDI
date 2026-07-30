import { test, expect } from "@playwright/test";

test("home page responds 200 and renders exactly one h1 (T-10.3)", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
});
