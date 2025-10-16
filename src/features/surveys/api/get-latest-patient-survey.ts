import { useQuery } from '@tanstack/react-query';
import { SurveyDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getLatestPatientSurvey = async (
  patientId: string,
): Promise<SurveyDto[]> => {
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get(`/patients/${patientId}/surveys/latest`);
  console.log('[API-CLIENT] fetching latest surveys for patient:', patientId);
  return response.data;
};

export const useLatestPatientSurvey = (patientId: string) =>
  useQuery({
    queryKey: ['surveys', 'latest', patientId],
    queryFn: () => getLatestPatientSurvey(patientId),
    enabled: !!patientId,
  });
