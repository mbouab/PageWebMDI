import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/config/site";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: `Contact — ${site.productName}`,
  description: "Contactez-nous pour demander une démo.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Contact</h1>
      <p className="mt-3 text-slate">
        Décrivez-nous votre établissement, on revient vers vous rapidement.
      </p>
      <div className="mt-8 rounded-2xl bg-sand/60 p-6 sm:p-8">
        <Suspense fallback={null}>
          <ContactPageClient />
        </Suspense>
      </div>
    </main>
  );
}
