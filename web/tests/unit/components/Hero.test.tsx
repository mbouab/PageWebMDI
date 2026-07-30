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

describe("Hero (T-2.1)", () => {
  it("renders the subhead and exactly 2 CTAs from the mocked site config", async () => {
    const { default: Hero } = await import("@/components/sections/Hero");

    render(<Hero />);

    expect(screen.getByText(mockedSite.hero.subhead)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockedSite.hero.ctaPrimary }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockedSite.hero.ctaSecondary }),
    ).toBeInTheDocument();
  });
});

describe("Hero (T-2.2, T-2.3)", () => {
  it("points the primary CTA to #contact-cta and the secondary CTA to #exemples", async () => {
    const { default: Hero } = await import("@/components/sections/Hero");

    render(<Hero />);

    expect(
      screen.getByRole("link", { name: mockedSite.hero.ctaPrimary }),
    ).toHaveAttribute("href", "#contact-cta");
    expect(
      screen.getByRole("link", { name: mockedSite.hero.ctaSecondary }),
    ).toHaveAttribute("href", "#exemples");
  });
});

describe("Hero (T-2.4 target)", () => {
  it("exposes an id='hero' anchor target for the nav brand link", async () => {
    const { default: Hero } = await import("@/components/sections/Hero");
    const { container } = render(<Hero />);

    expect(container.querySelector("#hero")).not.toBeNull();
  });
});
