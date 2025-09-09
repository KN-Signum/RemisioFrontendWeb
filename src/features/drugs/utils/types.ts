import { z } from 'zod';

export const DrugSchema = z.object({
  id: z.string(),
  patient_id: z.string(),
  drug_name: z.string(),
  dosage: z.string(),
  date_from: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  date_to: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  prescription_notes: z.string().optional(),
  updated_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
});

export type Drug = z.infer<typeof DrugSchema>;
