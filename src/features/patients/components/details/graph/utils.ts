import { DiagnosticTest } from '@/features/diagnostic_tests';
import { PatientScore } from '@/features/scores';

type FormatedPatientScore = {
  week: string;
  score: number;
};

type FormatedAnalyteValue = {
  date: Date;
  value: string | number | boolean | Date | undefined;
};

export function getAnalyteHistory(
  diagnosticData: DiagnosticTest[],
  analyteName: string,
): FormatedAnalyteValue[] {
  if (!diagnosticData?.length) return [];
  const relevant = diagnosticData.filter(
    (test) =>
      test[analyteName as keyof typeof test] !== undefined &&
      test[analyteName as keyof typeof test] !== null,
  );
  const sorted = [...relevant].sort((a, b) => +a.test_date - +b.test_date);
  return sorted.map((test) => ({
    date: test.test_date,
    value: test[analyteName as keyof typeof test],
  }));
}

export function formatPatientScores(
  patientScores: PatientScore[] | undefined | null,
): FormatedPatientScore[] {
  if (!patientScores) return [];
  return patientScores
    .sort((a, b) => +new Date(a.score_date) - +new Date(b.score_date))
    .map((score) => ({
      week: score.score_date.toISOString().split('T')[0],
      score: score.survey_score,
    }));
}
