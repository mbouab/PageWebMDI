"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
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

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-ink placeholder:text-slate/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30 focus:outline-none aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-ink";
const errorClass = "text-sm text-red-600";

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
    return (
      <p
        role="status"
        className="flex items-center gap-2 rounded-2xl bg-emerald/10 px-5 py-4 text-emerald-dark"
      >
        <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0" />
        Votre demande a bien été envoyée.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="contact-nom" className={labelClass}>
            Nom
          </label>
          <input
            id="contact-nom"
            className={fieldClass}
            {...register("nom")}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? "contact-nom-error" : undefined}
          />
          {errors.nom && (
            <p id="contact-nom-error" role="alert" className={errorClass}>
              {errors.nom.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className={fieldClass}
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="contact-telephone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="contact-telephone"
            type="tel"
            className={fieldClass}
            {...register("telephone")}
            aria-invalid={!!errors.telephone}
            aria-describedby={
              errors.telephone ? "contact-telephone-error" : undefined
            }
          />
          {errors.telephone && (
            <p id="contact-telephone-error" role="alert" className={errorClass}>
              {errors.telephone.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="contact-etablissement" className={labelClass}>
            Établissement
          </label>
          <input
            id="contact-etablissement"
            className={fieldClass}
            {...register("etablissement")}
            aria-invalid={!!errors.etablissement}
            aria-describedby={
              errors.etablissement ? "contact-etablissement-error" : undefined
            }
          />
          {errors.etablissement && (
            <p
              id="contact-etablissement-error"
              role="alert"
              className={errorClass}
            >
              {errors.etablissement.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-5">
        <div className="grid gap-1.5">
          <label htmlFor="contact-segment" className={labelClass}>
            Segment
          </label>
          <select
            id="contact-segment"
            defaultValue={defaultSegment ?? ""}
            className={fieldClass}
            {...register("segment")}
            aria-invalid={!!errors.segment}
            aria-describedby={
              errors.segment ? "contact-segment-error" : undefined
            }
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
            <p id="contact-segment-error" role="alert" className={errorClass}>
              {errors.segment.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="contact-nb-etablissements" className={labelClass}>
            Nombre d&apos;établissements
          </label>
          <input
            id="contact-nb-etablissements"
            type="number"
            min={1}
            className={fieldClass}
            {...register("nbEtablissements")}
            aria-invalid={!!errors.nbEtablissements}
            aria-describedby={
              errors.nbEtablissements
                ? "contact-nb-etablissements-error"
                : undefined
            }
          />
          {errors.nbEtablissements && (
            <p
              id="contact-nb-etablissements-error"
              role="alert"
              className={errorClass}
            >
              {errors.nbEtablissements.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={fieldClass}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <div className="flex items-start gap-2.5">
          <input
            id="contact-consentement"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 rounded border-ink/30 text-emerald focus:ring-emerald/40"
            {...register("consentement")}
            aria-invalid={!!errors.consentement}
            aria-describedby={
              errors.consentement ? "contact-consentement-error" : undefined
            }
          />
          <label htmlFor="contact-consentement" className="text-sm text-ink/80">
            J&apos;accepte que mes données soient utilisées pour être
            recontacté (RGPD)
          </label>
        </div>
        {errors.consentement && (
          <p id="contact-consentement-error" role="alert" className={errorClass}>
            {errors.consentement.message}
          </p>
        )}
      </div>

      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Ne remplissez pas ce champ</label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Une erreur est survenue lors de l&apos;envoi. Merci de réessayer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-emerald px-6 py-3 text-base font-semibold text-cream shadow-md shadow-emerald/25 transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}
