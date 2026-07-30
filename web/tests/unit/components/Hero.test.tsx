import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = {
  productName: "Nom Produit Mocké",
  tagline: "baseline mockée",
  hero: {
    headline: "Accroche mockée pour le test",
    subhead: "Sous-titre mocké pour le test",
    ctaPrimary: "CTA primaire mocké",
    ctaSecondary: "CTA secondaire mocké",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Hero (T-1.1)", () => {
  it("reflects the product name and headline from a mocked site config", async () => {
    const { default: Hero } = await import("@/components/sections/Hero");

    render(<Hero />);

    expect(screen.getByText(mockedSite.productName)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: mockedSite.hero.headline }),
    ).toBeInTheDocument();
  });
});
