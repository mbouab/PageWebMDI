import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Merci — ${site.productName}`,
  description: "Votre demande a bien été envoyée.",
};

export default function MerciPage() {
  return (
    <main>
      <h1>Merci pour votre demande</h1>
      <p>
        Votre message a bien été envoyé. Notre équipe vous recontactera dans
        les meilleurs délais.
      </p>
      <Link href="/">Retour à l&apos;accueil</Link>
    </main>
  );
}
