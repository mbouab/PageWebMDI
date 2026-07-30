import { describe, expect, it, vi } from "vitest";

const mockedSite = {
  productName: "Produit Mocké",
  company: "Société Mockée",
  seo: {
    title: "Titre Mocké",
    description: "Description mockée.",
    ogImage: "/assets/og-image-mocked.png",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("getStructuredData (JSON-LD Organization + Product)", () => {
  it("builds an Organization node from the mocked site config", async () => {
    const { getStructuredData } = await import("@/lib/structuredData");
    const data = getStructuredData();

    const organization = data["@graph"].find(
      (node) => node["@type"] === "Organization",
    );

    expect(organization).toBeDefined();
    expect(organization?.name).toBe(mockedSite.company);
  });

  it("builds a Product node with name, description and image from the mocked site config", async () => {
    const { getStructuredData } = await import("@/lib/structuredData");
    const data = getStructuredData();

    const product = data["@graph"].find((node) => node["@type"] === "Product");

    expect(product).toBeDefined();
    expect(product?.name).toBe(mockedSite.productName);
    expect(product?.description).toBe(mockedSite.seo.description);
    expect(product?.image).toBe(mockedSite.seo.ogImage);
  });
});
