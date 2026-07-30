import { describe, expect, it } from "vitest";
import { site, showClientNames, PRODUCT_NAME, PRODUCT_TAGLINE } from "@/config/site";

describe("site.ts (config foundation)", () => {
  it("exposes the product name and tagline used across the site", () => {
    expect(site.productName).toBe(PRODUCT_NAME);
    expect(site.tagline).toBe(PRODUCT_TAGLINE);
    expect(site.productName.length).toBeGreaterThan(0);
  });

  it("keeps segments and pricing plans in sync (every plan.segment has a matching segment option)", () => {
    const segmentValues = site.segments.map((s) => s.value);
    const planSegments = site.pricing.plans.map((p) => p.segment);

    for (const planSegment of planSegments) {
      expect(segmentValues).toContain(planSegment);
    }
    expect(new Set(planSegments).size).toBe(site.pricing.plans.length);
  });

  it("has exactly 3 plans: solo, groupe, reseau", () => {
    expect(site.pricing.plans.map((p) => p.id)).toEqual([
      "solo",
      "groupe",
      "reseau",
    ]);
  });

  it("prices the Réseau plan as 'sur devis' (no fixed amount)", () => {
    const reseau = site.pricing.plans.find((p) => p.id === "reseau");

    expect(reseau?.catalogMonthly).toBeNull();
    expect(reseau?.foundingMonthly).toBeNull();
  });

  it("prices Solo and Groupe with a catalogue and a founding (discounted) amount", () => {
    for (const id of ["solo", "groupe"]) {
      const plan = site.pricing.plans.find((p) => p.id === id);

      expect(typeof plan?.catalogMonthly).toBe("number");
      expect(typeof plan?.foundingMonthly).toBe("number");
      expect(plan?.foundingMonthly).toBeLessThan(plan!.catalogMonthly!);
    }
  });

  it("provides both a named and an anonymous client list (showClientNames toggle, T-1.3)", () => {
    expect(typeof showClientNames).toBe("boolean");
    expect(site.clients.named.length).toBeGreaterThan(0);
    expect(site.clients.anonymous.length).toBeGreaterThan(0);
  });

  it("keeps contact and legal fields present, even as [À CONFIRMER] placeholders", () => {
    expect(site.contact.email).toBeTruthy();
    expect(site.contact.phone).toBeTruthy();
    expect(site.contact.inbox).toBeTruthy();
    expect(site.legal.siret).toBeTruthy();
    expect(site.legal.address).toBeTruthy();
  });

  it("derives the SEO title from PRODUCT_NAME and PRODUCT_TAGLINE", () => {
    expect(site.seo.title).toContain(PRODUCT_NAME);
    expect(site.seo.title).toContain(PRODUCT_TAGLINE);
  });
});
