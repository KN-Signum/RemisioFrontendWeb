import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { SurveyCategory } from '@/features/survey';

export const calculateCrohnTotalScore = (
  liquidStools: number,
  abdominalPainSum: number,
  wellbeingSum: number,
  extraintestinalManifestations: number,
  antidiarrhealUse: boolean,
  abdominalMassScore: 0 | 2 | 5,
  hematocrit: number,
  idealWeightKg: number,
  currentWeightKg: number,
  isMale: boolean,
): number => {
  const referenceHct = isMale ? 47 : 42;
  const g = Math.max(0, referenceHct - hematocrit);
  const weightDiffPct = Math.max(
    0,
    ((idealWeightKg - currentWeightKg) / idealWeightKg) * 100,
  );

  return (
    2 * liquidStools +
    5 * abdominalPainSum +
    7 * wellbeingSum +
    20 * extraintestinalManifestations +
    30 * (antidiarrhealUse ? 1 : 0) +
    10 * abdominalMassScore +
    6 * g +
    weightDiffPct
  );
};

export const calculateCrohnCategory = (totalScore: number): SurveyCategory => {
  if (totalScore < 150) return 'remission';
  if (totalScore < 220) return 'mild';
  if (totalScore < 450) return 'moderate';
  return 'severe';
};

// Helper functions for UC scoring
export const calculateUcTotalScore = (
  stoolFrequency: number,
  rectalBleeding: number,
  physicianGlobal: number,
): number => {
  return stoolFrequency + rectalBleeding + physicianGlobal;
};

export const calculateUcCategory = (totalScore: number): SurveyCategory => {
  if (totalScore <= 2) return 'remission';
  if (totalScore <= 4) return 'mild';
  if (totalScore <= 6) return 'moderate';
  return 'severe';
};

// ===== CROHN'S DISEASE SURVEY ENDPOINTS =====

/** GET /api/patients/:patientId/surveys/crohn */
const getAllCrohnSurveys = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys/crohn`,
  ({ params }) => {
    const { patientId } = params;

    const surveys = db.crohnSurvey.findMany({
      where: { patient_id: { equals: patientId as string } },
    });

    const sorted = [...surveys].sort(
      (a, b) =>
        new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
    );

    return HttpResponse.json(
      {
        message: "Crohn's surveys retrieved successfully",
        content: { patient_id: patientId, surveys: sorted },
      },
      { status: 200 },
    );
  },
);

/** GET /api/patients/:patientId/surveys/crohn/latest */
const getLatestCrohnSurvey = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys/crohn/latest`,
  ({ params }) => {
    const { patientId } = params;

    const surveys = db.crohnSurvey.findMany({
      where: { patient_id: { equals: patientId as string } },
    });

    const latest =
      surveys.length === 0
        ? null
        : surveys.reduce((prev, cur) =>
            new Date(cur.survey_date) > new Date(prev.survey_date) ? cur : prev,
          );

    return HttpResponse.json(
      {
        message: latest
          ? "Latest Crohn's survey retrieved successfully"
          : 'No Crohn surveys found for this patient',
        content: latest,
      },
      { status: 200 },
    );
  },
);

// ===== Ulcerative Colitis SURVEY ENDPOINTS =====

/** GET /api/patients/:patientId/surveys/uc */
const getAllUcSurveys = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys/uc`,
  ({ params }) => {
    const { patientId } = params;

    const surveys = db.ucSurvey.findMany({
      where: { patient_id: { equals: patientId as string } },
    });

    const sorted = [...surveys].sort(
      (a, b) =>
        new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
    );

    return HttpResponse.json(
      {
        message: 'UC surveys retrieved successfully',
        content: { patient_id: patientId, surveys: sorted },
      },
      { status: 200 },
    );
  },
);

/** GET /api/patients/:patientId/surveys/uc/latest */
const getLatestUcSurvey = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys/uc/latest`,
  ({ params }) => {
    const { patientId } = params;

    const surveys = db.ucSurvey.findMany({
      where: { patient_id: { equals: patientId as string } },
    });

    const latest =
      surveys.length === 0
        ? null
        : surveys.reduce((prev, cur) =>
            new Date(cur.survey_date) > new Date(prev.survey_date) ? cur : prev,
          );

    return HttpResponse.json(
      {
        message: latest
          ? 'Latest UC survey retrieved successfully'
          : 'No UC surveys found for this patient',
        content: latest,
      },
      { status: 200 },
    );
  },
);

export const handlers = [
  getAllCrohnSurveys,
  getLatestCrohnSurvey,
  getAllUcSurveys,
  getLatestUcSurvey,
];
