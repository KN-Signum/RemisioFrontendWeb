// Common types
export type SurveyCategory = 'remission' | 'mild' | 'moderate' | 'severe';

// Base survey interface with common properties
interface BaseSurveyDto {
  id: string;
  patient_id: string;
  total_score: number;
  category: SurveyCategory;
  weight: number;
  notes: string;
  created_at: string;
  updated_at: string | null;
}

// Crohn's Disease Survey
export interface CrohnSurveyDto extends BaseSurveyDto {
  survey_type: 'crohn';
  abdominal_pain: number; // 0-3
  stools: number; // 0-3
  general_wellbeing: number; // 0-4
  antidiarrheal_use: boolean;
  extraintestinal_manifestations: number; // 0-9
  abdominal_mass: number; // 0-5
  hematocrit: number; // 0-4
}

// Ulcerative Colitis Survey
export interface UcSurveyDto extends BaseSurveyDto {
  survey_type: 'ulcerative_colitis';
  stool_frequency: number; // 0-3
  rectal_bleeding: number; // 0-3
  physician_global: number; // 0-3
}

export type SurveyDto = UcSurveyDto | CrohnSurveyDto;

export const isUcSurvey = (survey: SurveyDto): survey is UcSurveyDto => {
  return survey.survey_type === 'ulcerative_colitis';
};

export const isCrohnSurvey = (survey: SurveyDto): survey is CrohnSurveyDto => {
  return survey.survey_type === 'crohn';
};
