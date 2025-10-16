import { useQuery } from '@tanstack/react-query';
import { GetPatientDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getPatients = async (): Promise<GetPatientDto[]> => {
  console.log('[API-CLIENT] Fetching all patients');
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get('/patients');
  return response.data;
};

export const useGetPatients = () =>
  useQuery({
    queryKey: ['patients'],
    queryFn: () => getPatients(),
    initialData: [],
  });
