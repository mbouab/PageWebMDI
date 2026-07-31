"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Wrench,
  ShieldCheck,
  CalendarCheck,
  Users,
} from "lucide-react";
import { site } from "@/config/site";

const OFFER_ICONS: Record<string, typeof Wrench> = {
  setup: Wrench,
  pilot: ShieldCheck,
  annual: CalendarCheck,
  referral: Users,
};

export default function Tarifs() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { annual, plans, offers, vatNote } = site.pricing;
  const monthsBilled = 12 - annual.monthsFree;

  return (
    <section id="tarifs" aria-labelledby="tarifs-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mdi-cloche.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={36}
            className="hidden sm:block"
          />
          <h2
            id="tarifs-heading"
            className="max-w-2xl text-3xl font-bold text-ink sm:text-4xl"
          >
            Tarifs
          </h2>
        </div>
        <p className="mt-3 max-w-2xl text-slate">{site.pricingAnchor}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div
            role="group"
            aria-label="Périodicité de facturation"
            className="inline-flex rounded-full bg-sand p-1"
          >
            <button
              type="button"
              aria-pressed={!isAnnual}
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                !isAnnual ? "bg-emerald text-cream" : "text-ink/70"
              }`}
            >
              Mensuel
            </button>
            <button
              type="button"
              aria-pressed={isAnnual}
              onClick={() => setIsAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isAnnual ? "bg-emerald text-cream" : "text-ink/70"
              }`}
            >
              Annuel ({annual.savingsPct} % d&apos;économie)
            </button>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                plan.highlighted
                  ? "border-emerald bg-cream shadow-lg shadow-emerald/15"
                  : "border-ink/10 bg-cream shadow-sm shadow-ink/5"
              }`}
            >
              {plan.highlighted && plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-cream">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate">{plan.target}</p>

              {plan.catalogMonthly === null ? (
                <p className="mt-5 font-mono text-3xl font-semibold text-ink">
                  Sur devis
                </p>
              ) : (
                <div className="mt-5">
                  <p className="font-mono text-3xl font-semibold text-emerald-dark">
                    {isAnnual
                      ? `${plan.catalogMonthly * monthsBilled} €`
                      : `${plan.catalogMonthly} €`}
                    <span className="ml-1 text-sm font-normal text-slate">
                      {isAnnual ? "/ an" : plan.unit}
                    </span>
                  </p>
                </div>
              )}

              <p className="mt-3 text-sm font-medium text-emerald-dark">
                {plan.anchorLine}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink/80">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`/contact?segment=${plan.segment}`}
                className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-emerald text-cream hover:bg-emerald-dark"
                    : "border border-ink/15 text-ink hover:border-emerald hover:text-emerald-dark"
                }`}
              >
                Choisir {plan.name}
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => {
            const Icon = OFFER_ICONS[offer.id] ?? Check;
            return (
              <li key={offer.id} className="rounded-2xl bg-sand/60 p-5">
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-amber"
                />
                <h4 className="mt-2 text-sm font-semibold text-ink">
                  {offer.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate">
                  {offer.body}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-slate">{vatNote}</p>
      </div>
    </section>
  );
}
