import { PatientScore } from './types';

type FormatedPatientScore = {
  week: string;
  score: number;
};

export function formatPatientScores(
  patientScores: PatientScore[],
): FormatedPatientScore[] {
  if (!patientScores) return [];
  return patientScores
    .sort((a, b) => +a.score_date - +b.score_date)
    .map((score) => ({
      week: score.score_date.toISOString().split('T')[0],
      score: score.survey_score,
    }));
}
