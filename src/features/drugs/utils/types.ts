import { DateSchema } from '@/features/types';
import { z } from 'zod';

// TODO: Set proper ranges
export const DrugSchema = z.object({
  id: z.string(),
  patient_id: z.string(),
  drug_name: z.string(),
  dosage: z.string(),
  date_from: DateSchema,
  date_to: DateSchema,
  prescription_notes: z.string().optional(),
  created_at: DateSchema,
  updated_at: DateSchema,
});

export type Drug = z.infer<typeof DrugSchema>;
