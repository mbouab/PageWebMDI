import { z } from "zod";

export const SEGMENT_VALUES = ["solo", "groupe", "reseau"] as const;

const phoneRegex = /^[+]?[\d\s().-]{6,20}$/;

export const contactSchema = z.object({
  nom: z.string().min(2).max(80),
  email: z.string().email(),
  telephone: z
    .union([z.literal(""), z.string().regex(phoneRegex)])
    .optional(),
  etablissement: z.string().min(2).max(120),
  segment: z.enum(SEGMENT_VALUES),
  nbEtablissements: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().int().min(1).optional(),
  ),
  message: z.string().min(10).max(2000),
  consentement: z
    .boolean()
    .refine((value) => value === true, {
      message: "Le consentement est obligatoire.",
    }),
  website: z.string().optional(),
});

/** Validated, coerced output — what onSubmit/EmailSender receive. */
export type ContactInput = z.infer<typeof contactSchema>;
/** Raw field shape as React Hook Form manages it (pre-coercion). */
export type ContactFormValues = z.input<typeof contactSchema>;
