import { apiClient } from '@/lib/api-client';
import { SymptomDto } from '../types';
import { useQuery } from '@tanstack/react-query';

export const getSymptomsByPatientId = async (
  patientId: string,
): Promise<SymptomDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  console.log('[API-CLIENT] → Requesting symptoms for patientId:', patientId);
  try {
    // Make sure the URL matches exactly what the mock handler is expecting
    const url = `/api/symptoms/${patientId}`;
    console.log('[API-CLIENT] → Request URL:', url);

    const { data } = await apiClient.get(url);
    console.log('[API-CLIENT] ← symptoms response:', data);
    return data.content as SymptomDto[];
  } catch (error) {
    console.error('[API-CLIENT] ← Error fetching symptoms:', error);
    throw error;
  }
};

export const useSymptomsByPatientId = (patientId: string) => {
  const query = useQuery({
    queryKey: ['symptoms', patientId],
    queryFn: () => getSymptomsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [] as SymptomDto[],
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isFetching && !query.isFetched,
    error: query.error,
  };
};
