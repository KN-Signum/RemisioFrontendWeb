import { apiClient } from '@/lib/api-client';
import { SymptomDto } from '../types';
import { useQuery } from '@tanstack/react-query';

export const getSymptomsByPatientId = async (
  patientId: string,
): Promise<SymptomDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  console.log('[API-CLIENT] fetching symptoms for patientId:', patientId);
  const response = await apiClient.get(`/patients/${patientId}/symptoms`);
  return response.data;
};

export const useSymptomsByPatientId = (patientId: string) =>
  useQuery({
    queryKey: ['symptoms', patientId],
    queryFn: () => getSymptomsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });
