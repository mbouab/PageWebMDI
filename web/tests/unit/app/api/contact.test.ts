import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import type { FakeEmailSender as FakeEmailSenderType } from "@/lib/email/FakeEmailSender";

const { fakeEmailSender, testRateLimiter } = await vi.hoisted(async () => {
  const { FakeEmailSender } = await import("@/lib/email/FakeEmailSender");
  const { createRateLimiter } = await import("@/lib/rateLimit");

  return {
    fakeEmailSender: new FakeEmailSender(),
    testRateLimiter: createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 }),
  };
});

vi.mock("@/lib/email/getEmailSender", () => ({
  getEmailSender: () => fakeEmailSender,
}));
vi.mock("@/lib/rateLimit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/rateLimit")>();
  return { ...actual, contactRateLimiter: testRateLimiter };
});

const validPayload = {
  nom: "Jeanne Dupont",
  email: "jeanne@example.com",
  etablissement: "Boma Beach",
  segment: "solo",
  message: "Bonjour, je souhaite une démo de votre produit, merci.",
  consentement: true,
  website: "",
};

function postRequest(body: unknown) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  (fakeEmailSender as FakeEmailSenderType).sent.length = 0;
});

describe("POST /api/contact (T-9.1)", () => {
  it("returns 200 and sends 1 email for a valid payload", async () => {
    const { POST } = await import("@/app/api/contact/route");

    const response = await POST(postRequest(validPayload));

    expect(response.status).toBe(200);
    expect((fakeEmailSender as FakeEmailSenderType).sent).toHaveLength(1);
  });
});

describe("POST /api/contact (T-9.2)", () => {
  it("returns 400 and sends no email for an invalid payload", async () => {
    const { POST } = await import("@/app/api/contact/route");

    const response = await POST(
      postRequest({ ...validPayload, email: "pas-un-email" }),
    );

    expect(response.status).toBe(400);
    expect((fakeEmailSender as FakeEmailSenderType).sent).toHaveLength(0);
  });
});
