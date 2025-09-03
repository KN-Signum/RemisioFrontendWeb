import { apiClient } from '@/lib/api-client';
import { DrugDto } from '../types';
import { useQuery } from '@tanstack/react-query';

export const getDrugsByPatientId = async (
  patientId: string,
): Promise<DrugDto[]> => {
  const response = await apiClient.get(`/patients/${patientId}/drugs`);
  console.log('[API-CLIENT] fetching drugs for patient:', patientId);
  return response.data;
};

export const useDrugsByPatientId = (patientId: string) =>
  useQuery({
    queryKey: ['drugs', patientId],
    queryFn: () => getDrugsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });
