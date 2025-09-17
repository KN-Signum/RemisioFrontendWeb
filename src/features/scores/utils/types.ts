import { z } from 'zod';
import { DateSchema, DiseaseTypeSchema } from '@/features/types';

export const PatientScoreSchema = z.object({
  id: z.string(),
  total_score: z.number(),
  survey_score: z.number(),
  meal_score: z.number().nullable(),
  diagnostic_score: z.number().nullable(),
  disease_type: DiseaseTypeSchema,
  score_date: DateSchema,
  score_notes: z.string(),
  created_at: DateSchema,
});

export type PatientScore = z.infer<typeof PatientScoreSchema>;
