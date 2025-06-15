import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { v4 as uuidv4 } from 'uuid';

interface CrohnSurveyRequestData {
  survey_date: string;
  abdominal_pain: number;
  stools: number;
  general_wellbeing: number;
  extraintestinal_manifestations: number;
  abdominal_mass: number;
  hematocrit: number;
  weight_loss: number;
  total_score: number;
  category: string;
  notes?: string;
}

interface UcSurveyRequestData {
  survey_date: string;
  stool_frequency: number;
  rectal_bleeding: number;
  physician_global: number;
  total_score: number;
  category: string;
  notes?: string;
}
import {
  calculateCrohnCategory,
  calculateCrohnTotalScore,
  calculateUcCategory,
  calculateUcTotalScore,
} from '@/features/survey/types';

export const handlers = [
  // ===== CROHN'S DISEASE SURVEY ENDPOINTS =====

  // POST /api/patients/:id/surveys/crohn - Create a new Crohn's survey
  http.post(
    `${API_URL}/api/patients/:patientId/surveys/crohn`,
    async ({ params, request }) => {
      const { patientId } = params;
      const data = (await request.json()) as CrohnSurveyRequestData;

      // Validate patient exists
      const patient = db.patient.findFirst({
        where: {
          id: {
            equals: patientId as string,
          },
        },
      });

      if (!patient) {
        return HttpResponse.json(
          {
            message: 'Patient not found',
            content: null,
          },
          { status: 404 },
        );
      }

      // Calculate total score and category if not provided
      const abdominalPain = data?.abdominal_pain ?? 0;
      const stools = data?.stools ?? 0;
      const generalWellbeing = data?.general_wellbeing ?? 0;
      const extraintestinalManifestations =
        data?.extraintestinal_manifestations ?? 0;
      const abdominalMass = data?.abdominal_mass ?? 0;
      const hematocrit = data?.hematocrit ?? 0;
      const weightLoss = data?.weight_loss ?? 0;

      const totalScore =
        data?.total_score ??
        calculateCrohnTotalScore(
          abdominalPain,
          stools,
          generalWellbeing,
          extraintestinalManifestations,
          abdominalMass,
          hematocrit,
          weightLoss,
        );

      const category = data?.category ?? calculateCrohnCategory(totalScore);

      // Create the survey
      const now = new Date().toISOString();
      const survey = db.crohnSurvey.create({
        id: uuidv4(),
        patient_id: patientId as string,
        survey_date: data?.survey_date ?? now.split('T')[0],
        survey_type: 'crohn',
        abdominal_pain: abdominalPain,
        stools: stools,
        general_wellbeing: generalWellbeing,
        extraintestinal_manifestations: extraintestinalManifestations,
        abdominal_mass: abdominalMass,
        hematocrit: hematocrit,
        weight_loss: weightLoss,
        total_score: totalScore,
        category: category,
        notes: data?.notes || '',
        created_at: now,
        updated_at: now,
      });

      return HttpResponse.json(
        {
          message: "Crohn's survey created successfully",
          content: survey,
        },
        { status: 201 },
      );
    },
  ),

  // GET /api/patients/:id/surveys/crohn - Get all Crohn's surveys for a patient
  http.get(`${API_URL}/api/patients/:patientId/surveys/crohn`, ({ params }) => {
    const { patientId } = params;

    // Get all surveys for the patient
    const surveys = db.crohnSurvey.findMany({
      where: {
        patient_id: {
          equals: patientId as string,
        },
      },
    });

    // Sort by date (newest first)
    const sortedSurveys = [...surveys].sort(
      (a, b) =>
        new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
    );

    return HttpResponse.json(
      {
        message: "Crohn's surveys retrieved successfully",
        content: {
          patient_id: patientId,
          surveys: sortedSurveys,
        },
      },
      { status: 200 },
    );
  }),

  // GET /api/patients/:id/surveys/crohn/latest - Get the latest Crohn's survey for a patient
  http.get(
    `${API_URL}/api/patients/:patientId/surveys/crohn/latest`,
    ({ params }) => {
      const { patientId } = params;

      // Get all surveys for the patient
      const surveys = db.crohnSurvey.findMany({
        where: {
          patient_id: {
            equals: patientId as string,
          },
        },
      });

      // Sort by date (newest first) and get the first one
      const sortedSurveys = [...surveys].sort(
        (a, b) =>
          new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
      );

      const latestSurvey = sortedSurveys.length > 0 ? sortedSurveys[0] : null;

      return HttpResponse.json(
        {
          message: latestSurvey
            ? "Latest Crohn's survey retrieved successfully"
            : "No Crohn's surveys found for this patient",
          content: latestSurvey,
        },
        { status: 200 },
      );
    },
  ),

  // ===== ULCERATIVE COLITIS SURVEY ENDPOINTS =====

  // POST /api/patients/:id/surveys/uc - Create a new UC survey
  http.post(
    `${API_URL}/api/patients/:patientId/surveys/uc`,
    async ({ params, request }) => {
      const { patientId } = params;
      const data = (await request.json()) as UcSurveyRequestData;

      // Validate patient exists
      const patient = db.patient.findFirst({
        where: {
          id: {
            equals: patientId as string,
          },
        },
      });

      if (!patient) {
        return HttpResponse.json(
          {
            message: 'Patient not found',
            content: null,
          },
          { status: 404 },
        );
      }

      // Calculate total score and category if not provided
      const stoolFrequency = data?.stool_frequency ?? 0;
      const rectalBleeding = data?.rectal_bleeding ?? 0;
      const physicianGlobal = data?.physician_global ?? 0;

      const totalScore =
        data?.total_score ??
        calculateUcTotalScore(stoolFrequency, rectalBleeding, physicianGlobal);

      const category = data?.category ?? calculateUcCategory(totalScore);

      // Create the survey
      const now = new Date().toISOString();
      const survey = db.ucSurvey.create({
        id: uuidv4(),
        patient_id: patientId as string,
        survey_date: data?.survey_date ?? now.split('T')[0],
        survey_type: 'uc',
        stool_frequency: stoolFrequency,
        rectal_bleeding: rectalBleeding,
        physician_global: physicianGlobal,
        total_score: totalScore,
        category: category,
        notes: data?.notes || '',
        created_at: now,
        updated_at: now,
      });

      return HttpResponse.json(
        {
          message: 'UC survey created successfully',
          content: survey,
        },
        { status: 201 },
      );
    },
  ),

  // GET /api/patients/:id/surveys/uc - Get all UC surveys for a patient
  http.get(`${API_URL}/api/patients/:patientId/surveys/uc`, ({ params }) => {
    const { patientId } = params;

    // Get all surveys for the patient
    const surveys = db.ucSurvey.findMany({
      where: {
        patient_id: {
          equals: patientId as string,
        },
      },
    });

    // Sort by date (newest first)
    const sortedSurveys = [...surveys].sort(
      (a, b) =>
        new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
    );

    return HttpResponse.json(
      {
        message: 'UC surveys retrieved successfully',
        content: {
          patient_id: patientId,
          surveys: sortedSurveys,
        },
      },
      { status: 200 },
    );
  }),

  // GET /api/patients/:id/surveys/uc/latest - Get the latest UC survey for a patient
  http.get(
    `${API_URL}/api/patients/:patientId/surveys/uc/latest`,
    ({ params }) => {
      const { patientId } = params;

      // Get all surveys for the patient
      const surveys = db.ucSurvey.findMany({
        where: {
          patient_id: {
            equals: patientId as string,
          },
        },
      });

      // Sort by date (newest first) and get the first one
      const sortedSurveys = [...surveys].sort(
        (a, b) =>
          new Date(b.survey_date).getTime() - new Date(a.survey_date).getTime(),
      );

      const latestSurvey = sortedSurveys.length > 0 ? sortedSurveys[0] : null;

      return HttpResponse.json(
        {
          message: latestSurvey
            ? 'Latest UC survey retrieved successfully'
            : 'No UC surveys found for this patient',
          content: latestSurvey,
        },
        { status: 200 },
      );
    },
  ),
];
