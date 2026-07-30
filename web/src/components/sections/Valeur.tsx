import { piliers, benefits } from "@/content/valeur";

export default function Valeur() {
  return (
    <section id="valeur" aria-labelledby="valeur-heading">
      <h2 id="valeur-heading">Valeur</h2>
      <ul>
        {piliers.map((pilier) => (
          <li key={pilier.title}>
            <h3>{pilier.title}</h3>
            <p>{pilier.description}</p>
          </li>
        ))}
      </ul>
      <ul>
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </section>
  );
}
