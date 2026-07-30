import { describe, expect, it, vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example-production-domain.test");

describe("sitemap", () => {
  it("lists the home page with an absolute URL", async () => {
    const sitemap = (await import("@/app/sitemap")).default;
    const entries = sitemap();

    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://example-production-domain.test/",
      }),
    );
  });
});
