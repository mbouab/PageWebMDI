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
    <main>
      <h1>Contact</h1>
      <Suspense fallback={null}>
        <ContactPageClient />
      </Suspense>
    </main>
  );
}
