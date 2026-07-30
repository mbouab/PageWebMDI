import { describe, expect, it, vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example-production-domain.test");

describe("robots", () => {
  it("allows all crawlers and points to the sitemap", async () => {
    const robots = (await import("@/app/robots")).default;
    const result = robots();

    expect(result.rules).toEqual(
      expect.objectContaining({ userAgent: "*", allow: "/" }),
    );
    expect(result.sitemap).toBe(
      "https://example-production-domain.test/sitemap.xml",
    );
  });
});
