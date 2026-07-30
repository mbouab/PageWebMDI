import { site } from "@/config/site";
import { contactCta } from "@/content/contactCta";

export default function ContactCta() {
  const body = contactCta.bodyTemplate.replace(
    "{productName}",
    site.productName,
  );

  return (
    <section id="contact-cta" aria-labelledby="contact-cta-heading">
      <h2 id="contact-cta-heading">{contactCta.heading}</h2>
      <p>{body}</p>
      <a href="/contact">{contactCta.cta}</a>
    </section>
  );
}
