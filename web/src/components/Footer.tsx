import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()} {site.company}
      </p>
      <nav aria-label="Liens légaux">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Politique de confidentialité</Link>
      </nav>
    </footer>
  );
}
