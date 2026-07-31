import Image from "next/image";
import { site } from "@/config/site";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pt-20"
    >
      <div>
        <div className="flex items-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-3 py-1 text-sm font-semibold text-emerald-dark">
            {site.productName}
          </p>
          <Image
            src="/assets/mdi-service-table.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={32}
            className="hidden sm:block"
          />
        </div>
        <h1
          id="hero-heading"
          className="mt-5 text-4xl leading-[1.08] font-bold text-ink sm:text-5xl lg:text-[3.25rem]"
        >
          {site.hero.headline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate sm:text-xl">
          {site.hero.subhead}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact-cta"
            className="rounded-full bg-emerald px-6 py-3 text-center text-base font-semibold text-cream shadow-md shadow-emerald/25 transition-colors hover:bg-emerald-dark"
          >
            {site.hero.ctaPrimary}
          </a>
          <a
            href="#exemples"
            className="rounded-full border border-ink/15 px-6 py-3 text-center text-base font-semibold text-ink transition-colors hover:border-emerald hover:text-emerald-dark"
          >
            {site.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
        <Image
          src="/assets/hero-whatsapp.svg"
          alt={`Exemple de rapport quotidien ${site.productName} sur WhatsApp`}
          width={460}
          height={800}
          priority
          className="h-auto w-full drop-shadow-xl"
        />
      </div>
    </section>
  );
}
