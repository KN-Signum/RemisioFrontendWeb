import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  UcSurveyDto,
  CreateUcSurveyDto,
  GetPatientSurveysDto,
  calculateUcCategory,
  calculateUcTotalScore,
} from '../types';

/**
 * POST /patients/:id/surveys/uc
 * Creates a new UC survey for a patient
 */
export const createUcSurvey = async (
  data: CreateUcSurveyDto,
): Promise<UcSurveyDto> => {
  // Calculate total score and category before sending to API
  const totalScore = calculateUcTotalScore(
    data.stool_frequency,
    data.rectal_bleeding,
    data.physician_global,
  );
  const category = calculateUcCategory(totalScore);

  // Send the complete data to the API
  const response = await apiClient.post(
    `/api/patients/${data.patient_id}/surveys/uc`,
    {
      ...data,
      total_score: totalScore,
      category,
      survey_type: 'uc',
    },
  );

  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const useCreateUcSurvey = () => {
  return useMutation({
    mutationFn: createUcSurvey,
  });
};

/**
 * GET /patients/:id/surveys/uc
 * Retrieves all UC surveys for a patient
 */
export const getPatientUcSurveys = async (
  patientId: string,
): Promise<GetPatientSurveysDto<UcSurveyDto>> => {
  const response = await apiClient.get(`/api/patients/${patientId}/surveys/uc`);
  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const usePatientUcSurveys = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId, 'uc-surveys'],
    queryFn: () => getPatientUcSurveys(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * GET /patients/:id/surveys/uc/latest
 * Retrieves the most recent UC survey for a patient
 */
export const getLatestPatientUcSurvey = async (
  patientId: string,
): Promise<UcSurveyDto | null> => {
  const response = await apiClient.get(
    `/api/patients/${patientId}/surveys/uc/latest`,
  );
  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const useLatestPatientUcSurvey = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId, 'uc-survey', 'latest'],
    queryFn: () => getLatestPatientUcSurvey(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};
