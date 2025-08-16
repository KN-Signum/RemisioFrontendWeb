import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CrohnSurveyDto } from '../types';

/**
 * GET /patients/:id/surveys/crohn/latest
 * Retrieves the most recent Crohn's disease survey for a patient
 */
export const getLatestPatientCrohnSurvey = async (
  patientId: string,
): Promise<CrohnSurveyDto | null> => {
  const response = await apiClient.get(
    `/patients/${patientId}/surveys/crohn/latest`,
  );
  console.log(
    '[API-CLIENT] fetching latest Crohn survey for patient:',
    patientId,
  );
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
