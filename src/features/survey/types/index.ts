// Common types
export type SurveyCategory = 'remission' | 'mild' | 'moderate' | 'severe';

// Base survey interface with common properties
interface BaseSurveyDto {
  id: string;
  patient_id: string;
  survey_date: string;
  total_score: number;
  category: SurveyCategory;
  weight: number;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

// Crohn's Disease Survey
export interface CrohnSurveyDto extends BaseSurveyDto {
  survey_type: 'crohn';
  abdominal_pain: number; // 0-3
  stools: number; // 0-3
  general_wellbeing: number; // 0-4
  extraintestinal_manifestations: number; // 0-9
  abdominal_mass: number; // 0-5
  hematocrit: number; // 0-4
}

export interface CreateCrohnSurveyDto {
  patient_id: string;
  survey_date: string;
  abdominal_pain: number; // 0-3
  stools: number; // 0-3
  general_wellbeing: number; // 0-4
  extraintestinal_manifestations: number; // 0-9
  abdominal_mass: number; // 0-5
  hematocrit: number; // 0-4
  notes?: string;
  weight: number; // 60-120
}

// Ulcerative Colitis Survey
export interface UcSurveyDto extends BaseSurveyDto {
  survey_type: 'uc';
  stool_frequency: number; // 0-3
  rectal_bleeding: number; // 0-3
  physician_global: number; // 0-3
}

export interface CreateUcSurveyDto {
  patient_id: string;
  survey_date: string;
  stool_frequency: number; // 0-3
  rectal_bleeding: number; // 0-3
  physician_global: number; // 0-3
  notes?: string;
}

// Response types
export interface GetPatientSurveysDto<T extends BaseSurveyDto> {
  patient_id: string;
  surveys: T[];
}

