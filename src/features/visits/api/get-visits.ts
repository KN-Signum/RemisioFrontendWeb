import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetVisitDto } from '../types';

export const getVisits = async (): Promise<GetVisitDto[]> => {
  console.log('Fetching visits');
  const response = await apiClient.get('/visits');
  return response.data.content;
};

export const useGetVisits = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['visits'],
    queryFn: () => getVisits(),
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
