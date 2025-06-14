import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { SurveyCategory } from '@/features/survey';

export const calculateCrohnTotalScore = (
  abdominalPain: number,
  stools: number,
  generalWellbeing: number,
  extraintestinalManifestations: number,
  abdominalMass: number,
  hematocrit: number,
  weight: number
): number => {
  return (
    abdominalPain * 5 +
    stools * 5 +
    generalWellbeing * 7 +
    extraintestinalManifestations +
    abdominalMass * 5 +
    10 * (47 - hematocrit) +
    (((weight - 70) / 70) * 100) * 6
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
const getAllCrohnSurveys = http.get(
  `${API_URL}/api/patients/:patientId/surveys/crohn`,
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
const getLatestCrohnSurvey = http.get(
  `${API_URL}/api/patients/:patientId/surveys/crohn/latest`,
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
const getAllUcSurveys = http.get(
  `${API_URL}/api/patients/:patientId/surveys/uc`,
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
const getLatestUcSurvey = http.get(
  `${API_URL}/api/patients/:patientId/surveys/uc/latest`,
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


export const handlers = [getAllCrohnSurveys,
  getLatestCrohnSurvey,
  getAllUcSurveys,
  getLatestUcSurvey,];
