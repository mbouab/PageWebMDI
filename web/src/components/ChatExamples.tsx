"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { exemples, ILLUSTRATIVE_DISCLAIMER } from "@/content/exemples";
import { site } from "@/config/site";

export default function ChatExamples() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = exemples.find((e) => e.id === selectedId) ?? null;

  return (
    <section
      id="exemples"
      aria-labelledby="exemples-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <h2
          id="exemples-heading"
          className="max-w-2xl text-3xl font-bold text-ink sm:text-4xl"
        >
          Posez la question, la réponse arrive
        </h2>
        <p className="mt-3 max-w-xl text-slate">
          Cliquez une question pour voir le genre de réponse que{" "}
          {site.productName} enverrait sur WhatsApp.
        </p>

        <div className="mt-10 grid gap-4 rounded-2xl bg-whatsapp-chat p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">
          <ul className="flex flex-col gap-2">
            {exemples.map((exemple) => {
              const isSelected = exemple.id === selectedId;
              return (
                <li key={exemple.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(exemple.id)}
                    className={`ml-auto block max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-left text-sm shadow-sm transition-colors ${
                      isSelected
                        ? "bg-emerald text-cream"
                        : "bg-whatsapp-bubble-in text-ink hover:bg-white"
                    }`}
                  >
                    {exemple.question}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            role="status"
            aria-live="polite"
            className="flex min-h-[8rem] items-start rounded-2xl bg-whatsapp-chat/60 p-1 lg:min-h-full"
          >
            {selected ? (
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-whatsapp-bubble-out px-4 py-3 text-sm text-ink shadow-sm">
                <p className="leading-relaxed whitespace-pre-line">
                  {selected.reponse}
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs text-ink/50">
                  <small>{ILLUSTRATIVE_DISCLAIMER}</small>
                  <CheckCheck aria-hidden="true" className="h-3.5 w-3.5" />
                </p>
              </div>
            ) : (
              <p className="p-4 text-sm text-ink/40">
                Choisissez une question à gauche pour voir la réponse.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
