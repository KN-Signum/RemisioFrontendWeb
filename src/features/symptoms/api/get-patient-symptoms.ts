import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { PatientSymptom, PatientSymptomSchema } from '../utils/types';
import { validArrayResponseData } from '@/features/common';

export const getSymptomsByPatientId = async (
  patientId: string,
): Promise<PatientSymptom[]> => {
  console.log('[API-CLIENT] fetching symptoms for patientId:', patientId);

  const response = await apiClient.get(`/patients/${patientId}/symptoms`);
  if (validArrayResponseData(response.data)) {
    return response.data
      .map((patientSymptom: unknown) => {
        const parseResult = PatientSymptomSchema.safeParse(patientSymptom);
        if (!parseResult.success) {
          console.error('Invalid patientSymptom:', parseResult.error.errors);
          return null;
        }
        return parseResult.data;
      })
      .filter(
        (
          patientSymptom: PatientSymptom | null,
        ): patientSymptom is PatientSymptom => patientSymptom !== null,
      );
  }
  return [];
};

export const useSymptomsByPatientId = (patientId: string) =>
  useQuery({
    queryKey: ['symptoms', patientId],
    queryFn: () => getSymptomsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });
