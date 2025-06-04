import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SimpleTablePatientDto } from '../types';

// Function to get patients in table format from API
export const getTablePatients = async (): Promise<SimpleTablePatientDto[]> => {
  const response = await apiClient.get('/api/get_patients_table');
  return response.data.content;
};

// React Query hook for table patients
export const useTablePatients = () => {
  const { data, isFetching, isFetched, error } = useQuery({
    queryKey: ['table-patients'],
    queryFn: () => getTablePatients(),
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    error,
  };
};
