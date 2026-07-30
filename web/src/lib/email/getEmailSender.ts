import { site } from "@/config/site";
import type { EmailSender } from "./EmailSender";
import { LogEmailSender } from "./LogEmailSender";
import { ResendEmailSender } from "./ResendEmailSender";

export function getEmailSender(): EmailSender {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return new LogEmailSender();
  }

  return new ResendEmailSender({
    apiKey,
    from: process.env.CONTACT_FROM || "onboarding@resend.dev",
    to: process.env.CONTACT_INBOX || site.contact.inbox,
  });
}
