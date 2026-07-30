"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqItems } from "@/content/faq";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-ink sm:text-4xl"
        >
          FAQ
        </h2>

        <dl className="mt-8 divide-y divide-ink/10 border-t border-b border-ink/10">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div key={item.id}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink"
                  >
                    {item.question}
                    <Plus
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-emerald transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                </dt>
                <dd
                  id={panelId}
                  hidden={!isOpen}
                  className="pb-4 text-sm leading-relaxed text-slate"
                >
                  {item.reponse}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
