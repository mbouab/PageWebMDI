import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-sm text-slate sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.company}
        </p>
        <nav aria-label="Liens légaux" className="flex gap-5">
          <Link href="/mentions-legales" className="hover:text-emerald-dark">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-emerald-dark">
            Politique de confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
