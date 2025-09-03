import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SurveyDto } from '../types';

export const getPatientSurveys = async (
  patientId: string,
): Promise<SurveyDto[]> => {
  const response = await apiClient.get(`/patients/${patientId}/surveys`);
  console.log('[API-CLIENT] fetching surveys for patient:', patientId);
  return response.data;
};

export const usePatientSurveys = (patientId: string) =>
  useQuery({
    queryKey: ['surveys', patientId],
    queryFn: () => getPatientSurveys(patientId),
    enabled: !!patientId,
    initialData: [],
  });
