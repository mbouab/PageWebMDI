import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no critical accessibility violations (T-10.5)", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const critical = results.violations.filter(
    (violation) => violation.impact === "critical",
  );

  expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
});

test("contact page has no critical accessibility violations (T-10.5)", async ({
  page,
}) => {
  await page.goto("/contact");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const critical = results.violations.filter(
    (violation) => violation.impact === "critical",
  );

  expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
});
