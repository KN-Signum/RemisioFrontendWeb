import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { GetPatientScoresDto } from '../types';

export const getPatientScores = async (
  patientId: string,
): Promise<GetPatientScoresDto> => {
  const response = await apiClient.get(`/scores/${patientId}`);
  console.log('[API-CLIENT] fetching scores for patient:', patientId);
  return response.data.content;
};

export const usePatientScores = (patientId: string, scoreDate?: string) =>
  useQuery({
    queryKey: ['patient-scores', patientId, scoreDate],
    queryFn: () => getPatientScores(patientId),
    enabled: !!patientId,
  });
