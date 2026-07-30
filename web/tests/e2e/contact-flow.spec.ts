import { test, expect } from "@playwright/test";

test("full contact journey: hero CTA -> contact form -> /merci (T-11.1)", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .locator("#hero")
    .getByRole("link", { name: "Demander une démo" })
    .click();
  await expect(page).toHaveURL(/#contact-cta$/);

  await page
    .getByRole("link", { name: "Aller au formulaire de contact" })
    .click();
  await expect(page).toHaveURL("/contact");

  await page.getByLabel("Nom", { exact: true }).fill("Jeanne Dupont");
  await page.getByLabel("Email").fill("jeanne@example.com");
  await page.getByLabel("Établissement", { exact: true }).fill("Boma Beach");
  await page.getByLabel("Segment").selectOption("solo");
  await page
    .getByLabel("Message")
    .fill("Bonjour, je souhaite une démo de votre produit, merci.");
  await page.getByLabel(/consentement|accepte|rgpd/i).check();

  await page.getByRole("button", { name: "Envoyer" }).click();

  await expect(page).toHaveURL("/merci", { timeout: 10_000 });
  await expect(
    page.getByRole("heading", { level: 1, name: /merci/i }),
  ).toBeVisible();
});

test("clicking an example question reveals its answer (T-11.2)", async ({
  page,
}) => {
  await page.goto("/#exemples");

  const question = "Quel est le CA d'hier par rapport à l'objectif ?";
  await page.getByRole("button", { name: question }).click();

  await expect(
    page.locator("#exemples").getByRole("status"),
  ).toContainText("CA d'hier");
});

test("a pricing plan CTA pre-selects its segment on the contact form (T-11.3)", async ({
  page,
}) => {
  await page.goto("/#tarifs");

  await page.getByRole("link", { name: "Choisir Groupe" }).click();

  await expect(page).toHaveURL("/contact?segment=groupe");
  await expect(page.getByLabel("Segment")).toHaveValue("groupe");
});

test("the contact form is fully operable by keyboard (T-11.4)", async ({
  page,
}) => {
  await page.goto("/contact");

  await page.getByLabel("Nom", { exact: true }).click();
  await page.keyboard.type("Jeanne Dupont");
  await page.keyboard.press("Tab");
  await page.keyboard.type("jeanne@example.com");

  await expect(page.getByLabel("Email")).toHaveValue("jeanne@example.com");

  await page.getByLabel("Établissement", { exact: true }).fill("Boma Beach");
  await page.getByLabel("Segment").selectOption("solo");
  await page
    .getByLabel("Message")
    .fill("Bonjour, je souhaite une démo de votre produit, merci.");

  await page.getByLabel(/consentement|accepte|rgpd/i).focus();
  await page.keyboard.press("Space");
  await expect(page.getByLabel(/consentement|accepte|rgpd/i)).toBeChecked();

  await page.getByRole("button", { name: "Envoyer" }).focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL("/merci", { timeout: 10_000 });
});
