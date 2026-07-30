import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockedSite = { productName: "Nom Produit Mocké" };
vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("ContactCta", () => {
  it("renders the product name in the body and a link to /contact", async () => {
    const { default: ContactCta } = await import(
      "@/components/sections/ContactCta"
    );

    render(<ContactCta />);

    expect(
      screen.getByText(new RegExp(mockedSite.productName)),
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
  });
});
