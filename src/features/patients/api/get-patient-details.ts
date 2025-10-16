import { useQuery } from '@tanstack/react-query';
import { GetPatientDetailsDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getPatientDetails = async (
  pid: string,
): Promise<GetPatientDetailsDto> => {
  console.log('[API-CLIENT] Fetching patient details for PID:', pid);
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get(`/patients/${pid}?view=basic`);
  return response.data;
};

export const useGetPatientDetails = (pid: string) =>
  useQuery({
    queryKey: ['patientDetails', pid],
    queryFn: () => getPatientDetails(pid),
    initialData: null,
  });
