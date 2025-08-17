import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// ===== CROHN'S DISEASE SURVEY ENDPOINTS =====

/** GET /api/patients/:patientId/surveys */
const getAllSurveys = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys`,
  ({ params }) => {
    const { patientId } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let surveys: Array<any>;
    switch (
      db.patient.findFirst({
        where: { id: { equals: patientId as string } },
      })?.disease_type
    ) {
      case 'crohn':
        surveys = db.crohnSurvey.findMany({
          where: { patient_id: { equals: patientId as string } },
        });
        break;
      case 'uc':
        surveys = db.ucSurvey.findMany({
          where: { patient_id: { equals: patientId as string } },
        });
        break;
      default:
        surveys = [];
    }

    const sorted = [...surveys].sort(
      (a, b) =>
        new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
    );

    return HttpResponse.json(
      {
        message: 'Surveys retrieved successfully',
        content: { patient_id: patientId, surveys: sorted },
      },
      { status: 200 },
    );
  },
);

/** GET /api/patients/:patientId/surveys/latest */
const getLatestSurvey = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/surveys/latest`,
  ({ params }) => {
    const { patientId } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let surveys: Array<any>;
    switch (
      db.patient.findFirst({
        where: { id: { equals: patientId as string } },
      })?.disease_type
    ) {
      case 'crohn':
        surveys = db.crohnSurvey.findMany({
          where: { patient_id: { equals: patientId as string } },
        });
        break;
      case 'uc':
        surveys = db.ucSurvey.findMany({
          where: { patient_id: { equals: patientId as string } },
        });
        break;
      default:
        surveys = [];
    }
    const latest =
      surveys.length === 0
        ? null
        : surveys.reduce((prev, cur) =>
            new Date(cur.survey_date) > new Date(prev.survey_date) ? cur : prev,
          );

    return HttpResponse.json(
      {
        message: latest
          ? 'Latest survey retrieved successfully'
          : 'No surveys found for this patient',
        content: latest,
      },
      { status: 200 },
    );
  },
);

export const handlers = [getAllSurveys, getLatestSurvey];
