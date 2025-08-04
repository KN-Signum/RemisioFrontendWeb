import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UcSurveyDto } from '../types';

/**
 * GET /patients/:id/surveys/uc/latest
 * Retrieves the most recent UC survey for a patient
 */
export const getLatestPatientUcSurvey = async (
  patientId: string,
): Promise<UcSurveyDto | null> => {
  const response = await apiClient.get(
    `/patients/${patientId}/surveys/uc/latest`,
  );
  console.log('[API-CLIENT] fetching latest UC survey for patient:', patientId);
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
