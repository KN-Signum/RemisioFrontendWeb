import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PatientScoreDto } from '../types';

export const getPatientScores = async (
  patientId: string,
): Promise<PatientScoreDto[]> => {
  const response = await apiClient.get(`/patients/${patientId}/scores`);
  console.log('[API-CLIENT] fetching scores for patient:', patientId);
  return response.data;
};

export const usePatientScores = (patientId: string, scoreDate?: string) =>
  useQuery({
    queryKey: ['patient-scores', patientId, scoreDate],
    queryFn: () => getPatientScores(patientId),
    enabled: !!patientId,
    initialData: [],
  });
