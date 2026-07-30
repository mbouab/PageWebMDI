import { site } from "@/config/site";
import { contactCta } from "@/content/contactCta";

export default function ContactCta() {
  const body = contactCta.bodyTemplate.replace(
    "{productName}",
    site.productName,
  );

  return (
    <section id="contact-cta" aria-labelledby="contact-cta-heading" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-3xl bg-ink px-6 py-12 text-cream sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            id="contact-cta-heading"
            className="text-3xl font-bold sm:text-4xl"
          >
            {contactCta.heading}
          </h2>
          <p className="mt-3 max-w-md text-cream/80">{body}</p>
        </div>
        <a
          href="/contact"
          className="shrink-0 rounded-full bg-emerald px-6 py-3 text-center text-base font-semibold text-cream shadow-md shadow-emerald/30 transition-colors hover:bg-emerald-dark"
        >
          {contactCta.cta}
        </a>
      </div>
    </section>
  );
}
