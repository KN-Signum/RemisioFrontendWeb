import { z } from 'zod';
import { DateSchema } from '@/features/types';

export const PatientSymptomSchema = z.object({
  id: z.string(),
  patient_id: z.string(),
  symptom_type: z.string(),
  duration: z.string(),
  pain: z.number().int().min(0).max(10),
  additional_description: z.string(),
  date_added: DateSchema,
});

export type PatientSymptom = z.infer<typeof PatientSymptomSchema>;
