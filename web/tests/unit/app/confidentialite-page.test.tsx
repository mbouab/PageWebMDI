import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = {
  productName: "Nom Produit Mocké",
  contact: { email: "contact-mocke@example.com", phone: "", inbox: "" },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("/confidentialite page", () => {
  it("renders a single h1 and mentions the contact email from config", async () => {
    const { default: ConfidentialitePage } = await import(
      "@/app/confidentialite/page"
    );

    render(<ConfidentialitePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(new RegExp(mockedSite.contact.email)),
    ).toBeInTheDocument();
  });
});
