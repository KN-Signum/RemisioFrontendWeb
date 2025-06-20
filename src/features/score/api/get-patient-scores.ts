import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { GetPatientScoresDto } from '../types';

export const getPatientScores = async (
  patientId: string,
): Promise<GetPatientScoresDto> => {
  const url = `/api/patient_scores/${patientId}`;

  const { data } = await apiClient.get(url);
  console.log('[API-CLIENT] ←', data);
  return data.content;
};

export const usePatientScores = (patientId: string, scoreDate?: string) =>
  useQuery({
    queryKey: ['patient-scores', patientId, scoreDate],
    queryFn: () => getPatientScores(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
