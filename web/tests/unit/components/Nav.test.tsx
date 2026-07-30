import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = {
  productName: "Nom Produit Mocké",
  hero: {
    ctaPrimary: "CTA primaire mocké",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Nav (T-2.4)", () => {
  it("renders a link for each landing section", async () => {
    const { default: Nav } = await import("@/components/Nav");

    render(<Nav />);

    const expectedSections: Array<[string, string]> = [
      ["Valeur", "#valeur"],
      ["Comment ça marche", "#comment-ca-marche"],
      ["Exemples", "#exemples"],
      ["Clients", "#clients"],
      ["Tarifs", "#tarifs"],
      ["FAQ", "#faq"],
    ];

    for (const [label, href] of expectedSections) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
  });

  it("renders a contact CTA pointing to #contact-cta", async () => {
    const { default: Nav } = await import("@/components/Nav");

    render(<Nav />);

    expect(
      screen.getByRole("link", { name: mockedSite.hero.ctaPrimary }),
    ).toHaveAttribute("href", "#contact-cta");
  });

  it("renders the product name as the brand link", async () => {
    const { default: Nav } = await import("@/components/Nav");

    render(<Nav />);

    expect(screen.getByRole("link", { name: mockedSite.productName })).toHaveAttribute(
      "href",
      "#hero",
    );
  });
});
