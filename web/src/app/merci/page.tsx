import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Merci — ${site.productName}`,
  description: "Votre demande a bien été envoyée.",
};

export default function MerciPage() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald/10">
        <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-emerald" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-4xl">
        Merci pour votre demande
      </h1>
      <p className="mt-3 text-slate">
        Votre message a bien été envoyé. Notre équipe vous recontactera dans
        les meilleurs délais.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-emerald/25 transition-colors hover:bg-emerald-dark"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
