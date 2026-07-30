import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contactSchema";

const validPayload = {
  nom: "Jeanne Dupont",
  email: "jeanne@example.com",
  telephone: "+262 692 00 00 00",
  etablissement: "Boma Beach",
  segment: "solo" as const,
  nbEtablissements: 1,
  message: "Bonjour, je souhaite une démo de votre produit, merci.",
  consentement: true,
  website: "",
};

describe("contactSchema (T-7.1)", () => {
  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "pas-un-email" });

    expect(result.success).toBe(false);
  });
});

describe("contactSchema (T-7.2)", () => {
  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "trop court" });

    // "trop court" is exactly 10 chars — use a shorter one to test the boundary.
    const tooShort = contactSchema.safeParse({ ...validPayload, message: "court" });

    expect(result.success).toBe(true);
    expect(tooShort.success).toBe(false);
  });
});

describe("contactSchema (T-7.3)", () => {
  it("rejects when consentement is not checked", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      consentement: false,
    });

    expect(result.success).toBe(false);
  });
});

describe("contactSchema (T-7.4)", () => {
  it("rejects a segment outside the enum", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      segment: "entreprise",
    });

    expect(result.success).toBe(false);
  });
});

describe("contactSchema (T-7.5)", () => {
  it("succeeds for a fully valid payload", () => {
    const result = contactSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
  });

  it("succeeds without the optional telephone/nbEtablissements fields", () => {
    const minimalPayload = {
      nom: validPayload.nom,
      email: validPayload.email,
      etablissement: validPayload.etablissement,
      segment: validPayload.segment,
      message: validPayload.message,
      consentement: validPayload.consentement,
      website: validPayload.website,
    };
    const result = contactSchema.safeParse(minimalPayload);

    expect(result.success).toBe(true);
  });

  it("treats an empty-string nbEtablissements (as sent by an untouched number input) as absent, not 0", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      nbEtablissements: "",
    });

    expect(result.success).toBe(true);
  });
});

describe("contactSchema (T-7.6)", () => {
  it("still parses successfully when the honeypot field is filled (server decides how to react)", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      website: "http://spambot.example",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("http://spambot.example");
    }
  });
});
