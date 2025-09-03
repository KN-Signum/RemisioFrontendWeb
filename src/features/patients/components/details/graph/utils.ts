import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { PatientScoreDto } from '@/features/scores';

type FormatedPatientScore = {
  week: string;
  score: number;
};

type FormatedAnalyteValue = {
  date: string;
  value: string | number | boolean | undefined;
};

export function getAnalyteHistory(
  diagnosticData: DiagnosticTestDto[],
  analyteName: string,
): FormatedAnalyteValue[] {
  if (!diagnosticData?.length) return [];
  const relevant = diagnosticData.filter(
    (t) =>
      t[analyteName as keyof typeof t] !== undefined &&
      t[analyteName as keyof typeof t] !== null,
  );
  const sorted = [...relevant].sort(
    (a, b) => +new Date(a.test_date) - +new Date(b.test_date),
  );
  return sorted.map((test) => ({
    date: test.test_date.split('T')[0],
    value: test[analyteName as keyof typeof test],
  }));
}

export function formatPatientScores(
  patientScores: PatientScoreDto[] | undefined | null,
): FormatedPatientScore[] {
  if (!patientScores) return [];
  console.log('Formatting patient scores:', patientScores);
  return patientScores
    .sort((a, b) => +new Date(a.score_date) - +new Date(b.score_date))
    .map((score) => ({
      week: score.score_date.split('T')[0],
      score: score.survey_score,
    }));
}
