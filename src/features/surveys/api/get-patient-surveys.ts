import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientSurveysDto } from '../types';

export const getPatientSurveys = async (
  patientId: string,
): Promise<GetPatientSurveysDto> => {
  const response = await apiClient.get(`/patients/${patientId}/surveys`);
  console.log('[API-CLIENT] fetching surveys for patient:', patientId);
  return response.data.content;
};

export const usePatientSurveys = (patientId: string) =>
  useQuery({
    queryKey: ['surveys', patientId],
    queryFn: () => getPatientSurveys(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
