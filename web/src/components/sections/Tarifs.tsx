import { site } from "@/config/site";

export default function Tarifs() {
  return (
    <section aria-labelledby="tarifs-heading">
      <h2 id="tarifs-heading">Tarifs</h2>
      <ul>
        {site.pricing.plans.map((plan) => (
          <li key={plan.id}>
            <h3>{plan.name}</h3>
            {plan.foundingMonthly === null ? (
              <p>Sur devis</p>
            ) : (
              <p>
                {plan.foundingMonthly} € {plan.unit}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
