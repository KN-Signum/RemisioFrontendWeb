import { useQuery } from '@tanstack/react-query';
import { GetVisitDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getVisits = async (): Promise<GetVisitDto[]> => {
  console.log('Fetching visits');
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get('/visits');
  return response.data.content;
};

export const useGetVisits = () =>
  useQuery({
    queryKey: ['visits'],
    queryFn: () => getVisits(),
    initialData: [],
  });
