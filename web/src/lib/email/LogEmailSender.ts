import type { ContactEmailPayload, EmailSender } from "./EmailSender";

/**
 * Fallback used when RESEND_API_KEY is not configured (local dev, CI).
 * Never throws, so a missing key never crashes the contact flow (T-9.4).
 */
export class LogEmailSender implements EmailSender {
  async send(payload: ContactEmailPayload): Promise<void> {
    console.log("[EmailSender:fallback] RESEND_API_KEY missing — would send:", payload);
  }
}
