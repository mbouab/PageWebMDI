import type { ContactEmailPayload, EmailSender } from "./EmailSender";

/** In-memory EmailSender double for tests: records every message sent. */
export class FakeEmailSender implements EmailSender {
  sent: ContactEmailPayload[] = [];

  async send(payload: ContactEmailPayload): Promise<void> {
    this.sent.push(payload);
  }
}
