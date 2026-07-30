import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Mentions légales — ${site.productName}`,
  description: `Mentions légales de ${site.productName}.`,
};

export default function MentionsLegalesPage() {
  const { companyLegalName, siret, address, publisher } = site.legal;

  return (
    <main>
      <h1>Mentions légales</h1>
      <dl>
        <dt>Éditeur</dt>
        <dd>{publisher}</dd>
        <dt>Raison sociale</dt>
        <dd>{companyLegalName}</dd>
        <dt>SIRET</dt>
        <dd>{siret}</dd>
        <dt>Adresse</dt>
        <dd>{address}</dd>
      </dl>
    </main>
  );
}
