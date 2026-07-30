import { Resend } from "resend";
import type { ContactEmailPayload, EmailSender } from "./EmailSender";

type ResendEmailSenderOptions = {
  apiKey: string;
  from: string;
  to: string;
};

export class ResendEmailSender implements EmailSender {
  private readonly client: Resend;
  private readonly from: string;
  private readonly to: string;

  constructor({ apiKey, from, to }: ResendEmailSenderOptions) {
    this.client = new Resend(apiKey);
    this.from = from;
    this.to = to;
  }

  async send(payload: ContactEmailPayload): Promise<void> {
    await this.client.emails.send({
      from: this.from,
      to: this.to,
      subject: `Nouvelle demande de contact — ${payload.etablissement}`,
      replyTo: payload.email,
      text: [
        `Nom : ${payload.nom}`,
        `Email : ${payload.email}`,
        payload.telephone ? `Téléphone : ${payload.telephone}` : null,
        `Établissement : ${payload.etablissement}`,
        `Segment : ${payload.segment}`,
        payload.nbEtablissements
          ? `Nombre d'établissements : ${payload.nbEtablissements}`
          : null,
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }
}
