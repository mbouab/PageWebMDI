import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = {
  pricing: {
    plans: [
      {
        id: "solo",
        segment: "solo" as const,
        name: "Solo",
        target: "1 restaurant",
        catalogMonthly: 111,
        foundingMonthly: 77,
        unit: "par mois",
      },
      {
        id: "groupe",
        segment: "groupe" as const,
        name: "Groupe",
        target: "2 à 5 restaurants",
        catalogMonthly: 222,
        foundingMonthly: 88,
        unit: "par restaurant / mois",
      },
      {
        id: "reseau",
        segment: "reseau" as const,
        name: "Réseau",
        target: "6+ restaurants / franchise",
        catalogMonthly: null,
        foundingMonthly: null,
        unit: "sur devis",
      },
    ],
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Tarifs (T-1.2)", () => {
  it("renders each plan's price from the (mocked) site config, not a hardcoded value", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    // The mocked founding prices must appear...
    expect(screen.getByText(/77/)).toBeInTheDocument();
    expect(screen.getByText(/88/)).toBeInTheDocument();
    // ...and the real catalogue prices from site.ts must NOT (proves nothing is hardcoded).
    expect(screen.queryByText(/490/)).not.toBeInTheDocument();
    expect(screen.queryByText(/343/)).not.toBeInTheDocument();
  });

  it("shows 'Sur devis' for a plan with no price (Réseau)", async () => {
    const { default: Tarifs } = await import("@/components/sections/Tarifs");

    render(<Tarifs />);

    expect(screen.getByText(/sur devis/i)).toBeInTheDocument();
  });
});
