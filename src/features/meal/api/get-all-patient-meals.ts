import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { MealDto } from '../types';

export const getMealsByPatientId = async (patientId: string): Promise<MealDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  const { data } = await apiClient.get(`/api/meals/${patientId}`);
  console.log('[API-CLIENT] ← meals', data);
  return data.content as MealDto[];
};

export const useMealsByPatientId = (patientId: string) => {
  const query = useQuery({
    queryKey: ['meals', patientId],
    queryFn: () => getMealsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [] as MealDto[],
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isFetching && !query.isFetched,
  };
};
