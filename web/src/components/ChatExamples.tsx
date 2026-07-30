"use client";

import { useState } from "react";
import { exemples, ILLUSTRATIVE_DISCLAIMER } from "@/content/exemples";

export default function ChatExamples() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = exemples.find((e) => e.id === selectedId) ?? null;

  return (
    <section id="exemples" aria-labelledby="exemples-heading">
      <h2 id="exemples-heading">Exemples de questions</h2>
      <ul>
        {exemples.map((exemple) => (
          <li key={exemple.id}>
            <button type="button" onClick={() => setSelectedId(exemple.id)}>
              {exemple.question}
            </button>
          </li>
        ))}
      </ul>
      <div role="status" aria-live="polite">
        {selected && (
          <p>
            {selected.reponse}
            <br />
            <small>{ILLUSTRATIVE_DISCLAIMER}</small>
          </p>
        )}
      </div>
    </section>
  );
}
