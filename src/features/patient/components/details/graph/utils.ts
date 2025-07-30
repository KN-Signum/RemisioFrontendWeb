import { DiagnosticTestDto } from '@/features/diagnostic_tests';

interface PatientScoreData {
  score_date: string;
  score: number;
  notes?: string;
}

export const getAnalyteHistory = (
  diagnosticData: { tests: DiagnosticTestDto[] } | undefined,
  analyteName: string,
) => {
  if (!diagnosticData?.tests?.length) return [];
  const relevant = diagnosticData.tests.filter(
    (t) =>
      t[analyteName as keyof typeof t] !== undefined &&
      t[analyteName as keyof typeof t] !== null,
  );
  const sorted = [...relevant].sort(
    (a, b) => +new Date(a.test_date) - +new Date(b.test_date),
  );
  return sorted.map((t) => ({
    date: t.test_date.split('T')[0],
    value: t[analyteName as keyof typeof t],
  }));
};

export const formatPatientScores = (
  patientScores: PatientScoreData[] | null | undefined,
) => {
  if (!patientScores?.length) return [];
  return [...patientScores]
    .sort((a, b) => +new Date(a.score_date) - +new Date(b.score_date))
    .map((s) => ({ week: s.score_date.split('T')[0], score: s.score }));
};
