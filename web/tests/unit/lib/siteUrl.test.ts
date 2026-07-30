import { afterEach, describe, expect, it, vi } from "vitest";

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example-production-domain.test");
    vi.resetModules();
    const { getSiteUrl } = await import("@/lib/siteUrl");

    expect(getSiteUrl()).toBe("https://example-production-domain.test");
  });

  it("falls back to http://localhost:3000 when unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.resetModules();
    const { getSiteUrl } = await import("@/lib/siteUrl");

    expect(getSiteUrl()).toBe("http://localhost:3000");
  });
});
