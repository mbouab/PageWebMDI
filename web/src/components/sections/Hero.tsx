import { site } from "@/config/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <p>{site.productName}</p>
      <h1 id="hero-heading">{site.hero.headline}</h1>
      <p>{site.hero.subhead}</p>
    </section>
  );
}
