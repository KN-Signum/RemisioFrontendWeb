import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientDto } from '../types';

export const getPatients = async (): Promise<GetPatientDto[]> => {
  console.log('[API-CLIENT] Fetching all patients');
  const response = await apiClient.get('/patients');
  return response.data;
};

export const useGetPatients = () =>
  useQuery({
    queryKey: ['patients'],
    queryFn: () => getPatients(),
    initialData: [],
  });
