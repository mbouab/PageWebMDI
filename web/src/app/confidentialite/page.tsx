import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${site.productName}`,
  description: `Politique de confidentialité de ${site.productName}.`,
};

export default function ConfidentialitePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Politique de confidentialité
      </h1>
      <div className="mt-6 grid gap-4 text-sm leading-relaxed text-slate">
        <p>
          {site.productName} traite les données transmises via le formulaire
          de contact (nom, email, téléphone, établissement, message) dans le
          seul but de répondre à votre demande. Ces données sont hébergées au
          sein de l&apos;Union européenne, avec un accès restreint aux
          personnes habilitées, conformément au Règlement Général sur la
          Protection des Données (RGPD).
        </p>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification et de
          suppression de vos données. Pour l&apos;exercer, contactez-nous à
          l&apos;adresse : {site.contact.email}.
        </p>
      </div>
    </main>
  );
}
