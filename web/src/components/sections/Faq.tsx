"use client";

import { useState } from "react";
import { faqItems } from "@/content/faq";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">FAQ</h2>
      <dl>
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
                >
                  {item.question}
                </button>
              </dt>
              <dd id={panelId} hidden={!isOpen}>
                {item.reponse}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
