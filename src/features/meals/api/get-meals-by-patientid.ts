import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { MealDto } from '../types';

export const getMealsByPatientId = async (
  patientId: string,
): Promise<MealDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  const response = await apiClient.get(`/meals/${patientId}`);
  console.log('[API-CLIENT] fetching meals for patient:', patientId);
  return response.data.content;
};

export const useMealsByPatientId = (patientId: string) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['meals', patientId],
    queryFn: () => getMealsByPatientId(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: data,
    isLoading: isFetching && !isFetched,
  };
};
