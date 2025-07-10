import { apiClient } from '@/lib/api-client';
import { SymptomDto } from '../types';
import { useQuery } from '@tanstack/react-query';

export const getSymptomsByPatientId = async (
  patientId: string,
): Promise<SymptomDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  console.log('[API-CLIENT] fetching symptoms for patientId:', patientId);
  const response = await apiClient.get(`/symptoms/${patientId}`);
  return response.data.content;
};

export const useSymptomsByPatientId = (patientId: string) => {
  const { data, isFetched, isFetching } = useQuery({
    queryKey: ['symptoms', patientId],
    queryFn: () => getSymptomsByPatientId(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: data,
    isLoading: isFetching && !isFetched,
  };
};
