import { describe, expect, it, vi } from "vitest";

const mockedSite = {
  seo: {
    title: "Titre Mocké — baseline mockée",
    description: "Description mockée pour le test.",
    ogImage: "/assets/og-image.png",
  },
};

vi.mock("@/config/site", () => ({ site: mockedSite }));

describe("Root layout metadata (T-1.1)", () => {
  it("derives <title> from the mocked site config", async () => {
    const { metadata } = await import("@/app/metadata");

    expect(metadata.title).toBe(mockedSite.seo.title);
  });
});
