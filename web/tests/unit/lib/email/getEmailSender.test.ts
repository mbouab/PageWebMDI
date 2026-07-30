import { describe, expect, it, afterEach, vi } from "vitest";

describe("getEmailSender (T-9.4)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("falls back to LogEmailSender when RESEND_API_KEY is not set, without throwing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.resetModules();
    const { getEmailSender } = await import("@/lib/email/getEmailSender");
    const { LogEmailSender } = await import("@/lib/email/LogEmailSender");

    const sender = getEmailSender();

    expect(sender).toBeInstanceOf(LogEmailSender);
    await expect(
      sender.send({
        nom: "Jeanne",
        email: "jeanne@example.com",
        etablissement: "Boma Beach",
        segment: "solo",
        message: "Bonjour",
      }),
    ).resolves.not.toThrow();
  });

  it("uses ResendEmailSender when RESEND_API_KEY is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.resetModules();
    const { getEmailSender } = await import("@/lib/email/getEmailSender");
    const { ResendEmailSender } = await import(
      "@/lib/email/ResendEmailSender"
    );

    expect(getEmailSender()).toBeInstanceOf(ResendEmailSender);
  });
});
