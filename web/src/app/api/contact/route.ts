import { NextResponse, type NextRequest } from "next/server";
import { handleContactSubmission } from "@/lib/contactHandler";
import { getEmailSender } from "@/lib/email/getEmailSender";
import { contactRateLimiter } from "@/lib/rateLimit";

function getClientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const rawPayload = await request.json().catch(() => null);

  const result = await handleContactSubmission(
    rawPayload,
    getClientKey(request),
    { emailSender: getEmailSender(), rateLimiter: contactRateLimiter },
  );

  if (result.status === 429) {
    return NextResponse.json(
      { error: "Trop de requêtes, réessayez plus tard." },
      { status: 429 },
    );
  }

  if (result.status === 400) {
    return NextResponse.json(
      { error: "Requête invalide.", details: result.errors },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
