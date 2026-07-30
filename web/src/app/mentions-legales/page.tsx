import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Mentions légales — ${site.productName}`,
  description: `Mentions légales de ${site.productName}.`,
};

export default function MentionsLegalesPage() {
  const { companyLegalName, siret, address, publisher } = site.legal;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Mentions légales
      </h1>
      <dl className="mt-8 divide-y divide-ink/10 rounded-2xl bg-sand/60 px-6">
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-semibold text-ink">Éditeur</dt>
          <dd className="text-sm text-slate">{publisher}</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-semibold text-ink">Raison sociale</dt>
          <dd className="text-sm text-slate">{companyLegalName}</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-semibold text-ink">SIRET</dt>
          <dd className="text-sm text-slate">{siret}</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-semibold text-ink">Adresse</dt>
          <dd className="text-sm text-slate">{address}</dd>
        </div>
      </dl>
    </main>
  );
}
