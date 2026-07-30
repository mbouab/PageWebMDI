"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactInput,
  type ContactFormValues,
} from "@/lib/contactSchema";
import { site, type Segment } from "@/config/site";

type ContactFormStatus = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  defaultSegment?: Segment;
  onSubmit?: (data: ContactInput) => Promise<void>;
  onSuccess?: () => void;
};

async function defaultSubmit(data: ContactInput) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("La demande n'a pas pu être envoyée.");
  }
}

export default function ContactForm({
  defaultSegment,
  onSubmit = defaultSubmit,
  onSuccess,
}: ContactFormProps) {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      segment: defaultSegment,
      consentement: false,
      website: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      await onSubmit(data);
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return <p role="status">Votre demande a bien été envoyée.</p>;
  }

  return (
    <form onSubmit={submit} noValidate>
      <div>
        <label htmlFor="contact-nom">Nom</label>
        <input
          id="contact-nom"
          {...register("nom")}
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? "contact-nom-error" : undefined}
        />
        {errors.nom && <p id="contact-nom-error" role="alert">{errors.nom.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-telephone">Téléphone</label>
        <input
          id="contact-telephone"
          type="tel"
          {...register("telephone")}
          aria-invalid={!!errors.telephone}
          aria-describedby={
            errors.telephone ? "contact-telephone-error" : undefined
          }
        />
        {errors.telephone && (
          <p id="contact-telephone-error" role="alert">
            {errors.telephone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-etablissement">Établissement</label>
        <input
          id="contact-etablissement"
          {...register("etablissement")}
          aria-invalid={!!errors.etablissement}
          aria-describedby={
            errors.etablissement ? "contact-etablissement-error" : undefined
          }
        />
        {errors.etablissement && (
          <p id="contact-etablissement-error" role="alert">
            {errors.etablissement.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-segment">Segment</label>
        <select
          id="contact-segment"
          defaultValue={defaultSegment ?? ""}
          {...register("segment")}
          aria-invalid={!!errors.segment}
          aria-describedby={errors.segment ? "contact-segment-error" : undefined}
        >
          <option value="" disabled>
            Sélectionnez une option
          </option>
          {site.segments.map((segment) => (
            <option key={segment.value} value={segment.value}>
              {segment.label}
            </option>
          ))}
        </select>
        {errors.segment && (
          <p id="contact-segment-error" role="alert">
            {errors.segment.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-nb-etablissements">
          Nombre d&apos;établissements
        </label>
        <input
          id="contact-nb-etablissements"
          type="number"
          min={1}
          {...register("nbEtablissements")}
          aria-invalid={!!errors.nbEtablissements}
          aria-describedby={
            errors.nbEtablissements
              ? "contact-nb-etablissements-error"
              : undefined
          }
        />
        {errors.nbEtablissements && (
          <p id="contact-nb-etablissements-error" role="alert">
            {errors.nbEtablissements.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-consentement">
          J&apos;accepte que mes données soient utilisées pour être recontacté
          (RGPD)
        </label>
        <input
          id="contact-consentement"
          type="checkbox"
          {...register("consentement")}
          aria-invalid={!!errors.consentement}
          aria-describedby={
            errors.consentement ? "contact-consentement-error" : undefined
          }
        />
        {errors.consentement && (
          <p id="contact-consentement-error" role="alert">
            {errors.consentement.message}
          </p>
        )}
      </div>

      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="contact-website">
          Ne remplissez pas ce champ
        </label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert">
          Une erreur est survenue lors de l&apos;envoi. Merci de réessayer.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
