"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { SEGMENT_VALUES } from "@/lib/contactSchema";
import type { Segment } from "@/config/site";

function isSegment(value: string | null): value is Segment {
  return !!value && (SEGMENT_VALUES as readonly string[]).includes(value);
}

export default function ContactPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const segmentParam = searchParams.get("segment");
  const defaultSegment = isSegment(segmentParam) ? segmentParam : undefined;

  return (
    <ContactForm
      defaultSegment={defaultSegment}
      onSuccess={() => router.push("/merci")}
    />
  );
}
