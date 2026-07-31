import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { piliers, benefits } from "@/content/valeur";

export default function Valeur() {
  return (
    <section id="valeur" aria-labelledby="valeur-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mdi-couverts.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="hidden sm:block"
          />
          <h2
            id="valeur-heading"
            className="max-w-2xl text-3xl font-bold text-ink sm:text-4xl"
          >
            Ce qui change dès demain matin
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {piliers.map((pilier) => (
            <li
              key={pilier.title}
              className="rounded-2xl bg-sand p-6 shadow-sm shadow-ink/5"
            >
              <h3 className="text-lg font-semibold text-ink">
                {pilier.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {pilier.description}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid gap-4 rounded-2xl bg-ink px-6 py-8 text-cream sm:grid-cols-2 sm:px-10">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <CheckCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald"
              />
              <span className="text-sm leading-relaxed text-cream/90">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
