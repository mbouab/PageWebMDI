import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${site.productName}`,
  description: `Politique de confidentialité de ${site.productName}.`,
};

export default function ConfidentialitePage() {
  return (
    <main>
      <h1>Politique de confidentialité</h1>
      <p>
        {site.productName} traite les données transmises via le formulaire de
        contact (nom, email, téléphone, établissement, message) dans le seul
        but de répondre à votre demande. Ces données sont hébergées au sein
        de l&apos;Union européenne, avec un accès restreint aux personnes
        habilitées, conformément au Règlement Général sur la Protection des
        Données (RGPD).
      </p>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification et de
        suppression de vos données. Pour l&apos;exercer, contactez-nous à
        l&apos;adresse : {site.contact.email}.
      </p>
    </main>
  );
}
