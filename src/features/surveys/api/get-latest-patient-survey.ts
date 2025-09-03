import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SurveyDto } from '../types';

export const getLatestPatientSurvey = async (
  patientId: string,
): Promise<SurveyDto[]> => {
  const response = await apiClient.get(`/patients/${patientId}/surveys/latest`);
  console.log('[API-CLIENT] fetching latest surveys for patient:', patientId);
  return response.data;
};

export const useLatestPatientSurvey = (patientId: string) =>
  useQuery({
    queryKey: ['surveys', 'latest', patientId],
    queryFn: () => getLatestPatientSurvey(patientId),
    enabled: !!patientId,
  });
