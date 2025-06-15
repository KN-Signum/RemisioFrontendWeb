import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  CrohnSurveyDto,
  CreateCrohnSurveyDto,
  GetPatientSurveysDto,
  calculateCrohnCategory,
  calculateCrohnTotalScore,
} from '../types';

/**
 * POST /patients/:id/surveys/crohn
 * Creates a new Crohn's disease survey for a patient
 */
export const createCrohnSurvey = async (
  data: CreateCrohnSurveyDto,
): Promise<CrohnSurveyDto> => {
  // Calculate total score and category before sending to API
  const totalScore = calculateCrohnTotalScore(
    data.abdominal_pain,
    data.stools,
    data.general_wellbeing,
    data.extraintestinal_manifestations,
    data.abdominal_mass,
    data.hematocrit,
    data.weight_loss,
  );
  const category = calculateCrohnCategory(totalScore);

  // Send the complete data to the API
  const response = await apiClient.post(
    `/api/patients/${data.patient_id}/surveys/crohn`,
    {
      ...data,
      total_score: totalScore,
      category,
      survey_type: 'crohn',
    },
  );

  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const useCreateCrohnSurvey = () => {
  return useMutation({
    mutationFn: createCrohnSurvey,
  });
};

/**
 * GET /patients/:id/surveys/crohn
 * Retrieves all Crohn's disease surveys for a patient
 */
export const getPatientCrohnSurveys = async (
  patientId: string,
): Promise<GetPatientSurveysDto<CrohnSurveyDto>> => {
  const response = await apiClient.get(
    `/api/patients/${patientId}/surveys/crohn`,
  );
  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const usePatientCrohnSurveys = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId, 'crohn-surveys'],
    queryFn: () => getPatientCrohnSurveys(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * GET /patients/:id/surveys/crohn/latest
 * Retrieves the most recent Crohn's disease survey for a patient
 */
export const getLatestPatientCrohnSurvey = async (
  patientId: string,
): Promise<CrohnSurveyDto | null> => {
  const response = await apiClient.get(
    `/api/patients/${patientId}/surveys/crohn/latest`,
  );
  console.log('[API-CLIENT] ←', response.data);
  return response.data.content;
};

export const useLatestPatientCrohnSurvey = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId, 'crohn-survey', 'latest'],
    queryFn: () => getLatestPatientCrohnSurvey(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};
