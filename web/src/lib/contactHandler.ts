import { contactSchema } from "./contactSchema";
import type { EmailSender } from "./email/EmailSender";
import type { RateLimiter } from "./rateLimit";

export type ContactHandlerDeps = {
  emailSender: EmailSender;
  rateLimiter: RateLimiter;
};

export type ContactHandlerResult =
  | { status: 200 }
  | { status: 400; errors: Record<string, string[] | undefined> }
  | { status: 429 };

export async function handleContactSubmission(
  rawPayload: unknown,
  clientKey: string,
  { emailSender, rateLimiter }: ContactHandlerDeps,
): Promise<ContactHandlerResult> {
  if (!rateLimiter.check(clientKey).allowed) {
    return { status: 429 };
  }

  const parsed = contactSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return { status: 400, errors: parsed.error.flatten().fieldErrors };
  }

  // Honeypot filled -> silently treated as spam, no email sent (T-7.6).
  if (parsed.data.website) {
    return { status: 200 };
  }

  await emailSender.send({
    nom: parsed.data.nom,
    email: parsed.data.email,
    telephone: parsed.data.telephone,
    etablissement: parsed.data.etablissement,
    segment: parsed.data.segment,
    nbEtablissements: parsed.data.nbEtablissements,
    message: parsed.data.message,
  });

  return { status: 200 };
}
