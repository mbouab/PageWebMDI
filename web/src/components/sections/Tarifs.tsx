"use client";

import { useState } from "react";
import { site } from "@/config/site";

export default function Tarifs() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { founding, annual, plans, offers, vatNote } = site.pricing;
  const monthsBilled = 12 - annual.monthsFree;

  return (
    <section id="tarifs" aria-labelledby="tarifs-heading">
      <h2 id="tarifs-heading">Tarifs</h2>
      <p>{site.pricingAnchor}</p>

      <div role="group" aria-label="Périodicité de facturation">
        <button
          type="button"
          aria-pressed={!isAnnual}
          onClick={() => setIsAnnual(false)}
        >
          Mensuel
        </button>
        <button
          type="button"
          aria-pressed={isAnnual}
          onClick={() => setIsAnnual(true)}
        >
          Annuel ({annual.savingsPct} % d&apos;économie)
        </button>
      </div>

      {founding.spotsLeft > 0 && (
        <p role="status">
          {founding.label} — {founding.spotsLeft} places restantes
        </p>
      )}

      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.highlighted && plan.badge && <span>{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <p>{plan.target}</p>
            {plan.foundingMonthly === null || plan.catalogMonthly === null ? (
              <p>Sur devis</p>
            ) : (
              <p>
                <span>{plan.catalogMonthly} €</span>
                <strong>
                  {isAnnual
                    ? `${plan.foundingMonthly * monthsBilled} € / an`
                    : `${plan.foundingMonthly} € ${plan.unit}`}
                </strong>
              </p>
            )}
            <p>{plan.anchorLine}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href={`/contact?segment=${plan.segment}`}>Choisir {plan.name}</a>
          </li>
        ))}
      </ul>

      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <h4>{offer.title}</h4>
            <p>{offer.body}</p>
          </li>
        ))}
      </ul>

      <p>{vatNote}</p>
    </section>
  );
}
