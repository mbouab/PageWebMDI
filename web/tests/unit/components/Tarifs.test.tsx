import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockedSite = {
  pricingAnchor: "Ancrage tarifaire mocké.",
  pricing: {
    currency: "EUR",
    vatNote: "Mention TVA/HT mockée.",
    founding: {
      label: "Membres fondateurs",
      discountPct: 30,
      totalSpots: 5,
      spotsLeft: 3,
      note: "−30 % à vie.",
    },
    annual: { monthsFree: 2, savingsPct: 17 },
    plans: [
      {
        id: "solo",
        segment: "solo" as const,
        name: "Solo",
        target: "1 restaurant",
        catalogMonthly: 111,
        foundingMonthly: 77,
        unit: "par mois",
        anchorLine: "Ligne d'ancrage Solo mockée",
        highlighted: false,
        features: ["Fonctionnalité Solo A"],
      },
      {
        id: "groupe",
        segment: "groupe" as const,
        name: "Groupe",
        target: "2 à 5 restaurants",
        catalogMonthly: 222,
        foundingMonthly: 88,
        unit: "par restaurant / mois",
        anchorLine: "Ligne d'ancrage Groupe mockée",
        highlighted: true,
        badge: "La plus choisie",
        features: ["Fonctionnalité Groupe A"],
      },
      {
        id: "reseau",
        segment: "reseau" as const,
        name: "Réseau",
        target: "6+ restaurants / franchise",
        catalogMonthly: null,
        foundingMonthly: null,
        unit: "sur devis",
        anchorLine: "Ligne d'ancrage Réseau mockée",
        highlighted: false,
        features: ["Fonctionnalité Réseau A"],
      },
    ],
    offers: [
      { id: "founding", title: "Offre fondateurs mockée", body: "Corps 1" },
      { id: "setup", title: "Offre setup mockée", body: "Corps 2" },
      { id: "pilot", title: "Offre pilote mockée", body: "Corps 3" },
      { id: "annual", title: "Offre annuelle mockée", body: "Corps 4" },
      { id: "referral", title: "Offre parrainage mockée", body: "Corps 5" },
    ],
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Tarifs (T-1.2)", () => {
  it("renders each plan's price from the (mocked) site config, not a hardcoded value", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(/77/)).toBeInTheDocument();
    expect(screen.getByText(/88/)).toBeInTheDocument();
    expect(screen.queryByText(/490/)).not.toBeInTheDocument();
    expect(screen.queryByText(/343/)).not.toBeInTheDocument();
  });
});

describe("Tarifs (T-5.1)", () => {
  it("renders the 3 plans: Solo, Groupe, Réseau", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByRole("heading", { name: "Solo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Groupe" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Réseau" })).toBeInTheDocument();
  });
});

describe("Tarifs (T-5.2)", () => {
  it("shows 'Sur devis' for Réseau, with no monetary amount", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(/sur devis/i)).toBeInTheDocument();
  });
});

describe("Tarifs (T-5.3)", () => {
  it("links each plan's CTA to /contact with the matching segment pre-selected", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(
      screen.getByRole("link", { name: /choisir solo/i }),
    ).toHaveAttribute("href", "/contact?segment=solo");
    expect(
      screen.getByRole("link", { name: /choisir groupe/i }),
    ).toHaveAttribute("href", "/contact?segment=groupe");
    expect(
      screen.getByRole("link", { name: /choisir réseau/i }),
    ).toHaveAttribute("href", "/contact?segment=reseau");
  });
});

describe("Tarifs (T-5.4)", () => {
  it("shows the VAT/HT mention", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(mockedSite.pricing.vatNote)).toBeInTheDocument();
  });
});

describe("Tarifs (pricing anchor & founding rarity banner)", () => {
  it("shows the pricing anchor line above the cards", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(mockedSite.pricingAnchor)).toBeInTheDocument();
  });

  it("shows the founding rarity banner with the remaining spots count", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(/3 places restantes/i)).toBeInTheDocument();
  });
});

describe("Tarifs (highlighted plan)", () => {
  it("shows the badge on the highlighted plan (Groupe)", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText("La plus choisie")).toBeInTheDocument();
  });
});

describe("Tarifs (monthly/annual toggle)", () => {
  it("shows the monthly price by default, and the annual total after toggling", async () => {
    const user = userEvent.setup();
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    // 77 €/mois by default (Solo founding price).
    expect(screen.getByText(/77 €/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /annuel/i }));

    // 10 months billed out of 12 (2 offered) => 77 * 10 = 770.
    expect(screen.getByText(/770 €/)).toBeInTheDocument();
  });
});

describe("Tarifs (launch offers)", () => {
  it("lists all 5 launch offers", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    for (const offer of mockedSite.pricing.offers) {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    }
  });
});
