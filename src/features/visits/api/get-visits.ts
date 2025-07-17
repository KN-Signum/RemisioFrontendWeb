import { useQuery } from '@tanstack/react-query';
import { GetVisitDto } from '../types';
import { mockVisits } from '../mocks/visits';

export const getVisits = async (): Promise<GetVisitDto[]> => {
  return mockVisits;
};
// for now we will return empty list, while the backend is not ready
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
