import { describe, expect, it, vi } from "vitest";

const mockedSite = {
  seo: {
    title: "Titre Mocké — baseline mockée",
    description: "Description mockée pour le test.",
    ogImage: "/assets/og-image-mocked.png",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Root layout metadata (T-1.1)", () => {
  it("derives <title> from the mocked site config", async () => {
    const { metadata } = await import("@/app/metadata");

    expect(metadata.title).toBe(mockedSite.seo.title);
  });
});

describe("Root layout metadata (T-10.1)", () => {
  it("exposes a non-empty <title> and meta description", async () => {
    const { metadata } = await import("@/app/metadata");

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(metadata.description).toBe(mockedSite.seo.description);
  });
});

describe("Root layout metadata (T-10.2)", () => {
  it("exposes Open Graph title, description and image from the mocked site config", async () => {
    const { metadata } = await import("@/app/metadata");

    expect(metadata.openGraph?.title).toBe(mockedSite.seo.title);
    expect(metadata.openGraph?.description).toBe(mockedSite.seo.description);

    const images = metadata.openGraph?.images;
    const firstImage = Array.isArray(images) ? images[0] : images;
    const imageUrl =
      typeof firstImage === "object" && firstImage && "url" in firstImage
        ? firstImage.url
        : firstImage;

    expect(String(imageUrl)).toBe(mockedSite.seo.ogImage);
  });
});
