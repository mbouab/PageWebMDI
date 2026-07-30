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
  nbEtablissements: z.coerce.number().int().min(1).optional(),
  message: z.string().min(10).max(2000),
  consentement: z.literal(true),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
