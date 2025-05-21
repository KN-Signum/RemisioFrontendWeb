import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientDto } from '../types';

export const getPatients = async (): Promise<GetPatientDto[]> => {
  const response = await apiClient.get('/api/get_all_patients');
  return response.data.content;
};

export const usePatients = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['patients'],
    queryFn: () => getPatients(),
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
