import { site, showClientNames } from "@/config/site";

export default function Clients() {
  const { heading, groupName, location, named, anonymous, testimonial } =
    site.clients;
  const displayed = showClientNames ? named : anonymous;

  return (
    <section id="clients" aria-labelledby="clients-heading">
      <h2 id="clients-heading">{heading}</h2>
      <p>
        {groupName} — {location}
      </p>
      <ul>
        {displayed.map((client) => (
          <li key={client.name}>
            <p>{client.name}</p>
            <p>{client.place}</p>
          </li>
        ))}
      </ul>
      {testimonial && (
        <blockquote>
          <p>{testimonial.quote}</p>
          <cite>
            {testimonial.author}, {testimonial.role}
          </cite>
        </blockquote>
      )}
    </section>
  );
}
