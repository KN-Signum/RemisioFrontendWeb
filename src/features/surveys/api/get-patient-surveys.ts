import { useQuery } from '@tanstack/react-query';
import { SurveyDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getPatientSurveys = async (
  patientId: string,
): Promise<SurveyDto[]> => {
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get(`/patients/${patientId}/surveys`);
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
