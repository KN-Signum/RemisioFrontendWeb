import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PatientScore, PatientScoreSchema } from '../utils/types';
import { validArrayResponseData } from '@/features/common';

export const getPatientScores = async (
  patientId: string,
): Promise<PatientScore[]> => {
  console.log('[API-CLIENT] fetching scores for patient:', patientId);

  const response = await apiClient.get(`/patients/${patientId}/scores`);
  if (validArrayResponseData(response.data)) {
    return response.data
      .map((patientScore: unknown) => {
        const parseResult = PatientScoreSchema.safeParse(patientScore);
        if (!parseResult.success) {
          console.error('Invalid patientScore:', parseResult.error.errors);
          return null;
        }
        return parseResult.data;
      })
      .filter(
        (patientScore: PatientScore | null): patientScore is PatientScore =>
          patientScore !== null,
      );
  }
  return [];
};

export const usePatientScores = (patientId: string, scoreDate?: string) =>
  useQuery({
    queryKey: ['patient-scores', patientId, scoreDate],
    queryFn: () => getPatientScores(patientId),
    enabled: !!patientId,
    initialData: [],
  });
