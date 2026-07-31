import Image from "next/image";
import { site, showClientNames } from "@/config/site";

export default function Clients() {
  const { heading, groupName, location, named, anonymous, testimonial } =
    site.clients;
  const displayed = showClientNames ? named : anonymous;

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mdi-plat-signature.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            className="hidden sm:block"
          />
          <h2
            id="clients-heading"
            className="max-w-2xl text-3xl font-bold text-ink sm:text-4xl"
          >
            {heading}
          </h2>
        </div>
        <p className="mt-2 text-slate">
          {groupName} — {location}
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {displayed.map((client) => (
            <li
              key={client.name}
              className="rounded-2xl border border-ink/10 bg-sand/60 p-6"
            >
              {"logo" in client && client.logo && (
                <div className="mb-4 inline-flex rounded-xl bg-cream p-3 shadow-sm shadow-ink/5">
                  <Image
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    width={120}
                    height={72}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              )}
              <p className="text-lg font-semibold text-ink">{client.name}</p>
              <p className="mt-1 text-sm text-slate">{client.place}</p>
            </li>
          ))}
        </ul>

        {testimonial && (
          <blockquote className="mt-8 rounded-2xl bg-sand/60 p-6">
            <p className="text-lg text-ink italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <cite className="mt-3 block text-sm text-slate not-italic">
              {testimonial.author}, {testimonial.role}
            </cite>
          </blockquote>
        )}
      </div>
    </section>
  );
}
