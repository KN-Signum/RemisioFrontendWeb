import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

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
