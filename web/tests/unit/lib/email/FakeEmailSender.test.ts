import { describe, expect, it } from "vitest";
import { FakeEmailSender } from "@/lib/email/FakeEmailSender";

describe("FakeEmailSender", () => {
  it("records every message sent to it", async () => {
    const sender = new FakeEmailSender();

    await sender.send({
      nom: "Jeanne",
      email: "jeanne@example.com",
      etablissement: "Boma Beach",
      segment: "solo",
      message: "Bonjour",
    });

    expect(sender.sent).toHaveLength(1);
    expect(sender.sent[0]).toMatchObject({ nom: "Jeanne" });
  });
});
