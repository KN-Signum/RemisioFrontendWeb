import { DiseaseType } from '@/types';

export interface PatientScoreDto {
  id: string;
  total_score: number;
  survey_score: number;
  meal_score: number | null;
  diagnostic_score: number | null;
  disease_type: DiseaseType;
  score_date: string;
  score_notes: string;
  created_at: string;
}
