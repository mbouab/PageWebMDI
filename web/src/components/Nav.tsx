import Image from "next/image";
import { site } from "@/config/site";

const SECTION_LINKS = [
  { href: "#valeur", label: "Valeur" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#exemples", label: "Exemples" },
  { href: "#clients", label: "Clients" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <nav aria-label="Navigation principale">
      <a href="#hero">
        <Image
          src="/assets/logo-mdi.svg"
          alt={site.productName}
          width={160}
          height={50}
        />
      </a>
      <ul>
        {SECTION_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact-cta">{site.hero.ctaPrimary}</a>
    </nav>
  );
}
