import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = {
  productName: "Nom Produit Mocké",
  legal: {
    companyLegalName: "Raison sociale mockée",
    siret: "SIRET-MOCKE-123",
    address: "Adresse mockée",
    publisher: "Éditeur mocké",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("/mentions-legales page", () => {
  it("renders a single h1 and every legal field from the (mocked) config", async () => {
    const { default: MentionsLegalesPage } = await import(
      "@/app/mentions-legales/page"
    );

    render(<MentionsLegalesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(mockedSite.legal.companyLegalName),
    ).toBeInTheDocument();
    expect(screen.getByText(mockedSite.legal.siret)).toBeInTheDocument();
    expect(screen.getByText(mockedSite.legal.address)).toBeInTheDocument();
    expect(screen.getByText(mockedSite.legal.publisher)).toBeInTheDocument();
  });
});
