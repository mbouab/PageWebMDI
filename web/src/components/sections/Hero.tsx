import Image from "next/image";
import { site } from "@/config/site";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <p>{site.productName}</p>
      <h1 id="hero-heading">{site.hero.headline}</h1>
      <p>{site.hero.subhead}</p>
      <div>
        <a href="#contact-cta">{site.hero.ctaPrimary}</a>
        <a href="#exemples">{site.hero.ctaSecondary}</a>
      </div>
      <Image
        src="/assets/hero-whatsapp.svg"
        alt={`Exemple de rapport quotidien ${site.productName} sur WhatsApp`}
        width={460}
        height={800}
        priority
      />
    </section>
  );
}
