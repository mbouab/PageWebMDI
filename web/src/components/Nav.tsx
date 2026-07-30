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
    <nav
      aria-label="Navigation principale"
      className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-ink/5 bg-cream/85 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-10"
    >
      <a href="#hero" className="shrink-0">
        <Image
          src="/assets/logo-mdi.svg"
          alt={site.productName}
          width={128}
          height={40}
          className="h-8 w-auto sm:h-9"
          priority
        />
      </a>
      <ul className="hidden items-center gap-7 text-sm font-medium text-ink/80 lg:flex">
        {SECTION_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="transition-colors hover:text-emerald-dark"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact-cta"
        className="shrink-0 rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-cream shadow-sm shadow-emerald/20 transition-colors hover:bg-emerald-dark sm:px-5"
      >
        {site.hero.ctaPrimary}
      </a>
    </nav>
  );
}
