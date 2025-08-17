import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientSurveysDto } from '../types';

export const getLatestPatientSurvey = async (
  patientId: string,
): Promise<GetPatientSurveysDto> => {
  const response = await apiClient.get(`/patients/${patientId}/surveys/latest`);
  console.log('[API-CLIENT] fetching latest surveys for patient:', patientId);
  return response.data.content;
};

export const useLatestPatientSurvey = (patientId: string) =>
  useQuery({
    queryKey: ['surveys', 'latest', patientId],
    queryFn: () => getLatestPatientSurvey(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
