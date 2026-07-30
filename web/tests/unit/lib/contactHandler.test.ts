import { describe, expect, it } from "vitest";
import { handleContactSubmission } from "@/lib/contactHandler";
import { FakeEmailSender } from "@/lib/email/FakeEmailSender";
import { createRateLimiter } from "@/lib/rateLimit";

const validPayload = {
  nom: "Jeanne Dupont",
  email: "jeanne@example.com",
  etablissement: "Boma Beach",
  segment: "solo",
  message: "Bonjour, je souhaite une démo de votre produit, merci.",
  consentement: true,
  website: "",
};

function makeDeps() {
  return {
    emailSender: new FakeEmailSender(),
    rateLimiter: createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 }),
  };
}

describe("handleContactSubmission (T-9.1)", () => {
  it("returns 200 and sends exactly 1 email for a valid payload", async () => {
    const deps = makeDeps();

    const result = await handleContactSubmission(validPayload, "1.1.1.1", deps);

    expect(result.status).toBe(200);
    expect(deps.emailSender.sent).toHaveLength(1);
    expect(deps.emailSender.sent[0]).toMatchObject({
      nom: "Jeanne Dupont",
      email: "jeanne@example.com",
    });
  });
});

describe("handleContactSubmission (T-9.2)", () => {
  it("returns 400 and sends no email for an invalid payload", async () => {
    const deps = makeDeps();

    const result = await handleContactSubmission(
      { ...validPayload, email: "pas-un-email" },
      "1.1.1.1",
      deps,
    );

    expect(result.status).toBe(400);
    expect(deps.emailSender.sent).toHaveLength(0);
  });
});

describe("handleContactSubmission (T-9.3)", () => {
  it("returns 429 once the rate limit for the caller's IP is exceeded", async () => {
    const deps = { ...makeDeps(), rateLimiter: createRateLimiter({ max: 1, windowMs: 60_000 }) };

    const first = await handleContactSubmission(validPayload, "9.9.9.9", deps);
    const second = await handleContactSubmission(validPayload, "9.9.9.9", deps);

    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
  });
});

describe("handleContactSubmission (T-7.6, honeypot)", () => {
  it("returns 200 without sending any email when the honeypot is filled", async () => {
    const deps = makeDeps();

    const result = await handleContactSubmission(
      { ...validPayload, website: "http://spambot.example" },
      "1.1.1.1",
      deps,
    );

    expect(result.status).toBe(200);
    expect(deps.emailSender.sent).toHaveLength(0);
  });
});
