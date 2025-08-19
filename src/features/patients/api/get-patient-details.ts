import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientDetailsDto } from '../types';

export const getPatientDetails = async (
  pid: string,
): Promise<GetPatientDetailsDto> => {
  console.log('[API-CLIENT] Fetching patient details for PID:', pid);
  const response = await apiClient.get(`/patients/${pid}?view=basic`);
  return response.data;
};

export const useGetPatientDetails = (pid: string) =>
  useQuery({
    queryKey: ['patientDetails', pid],
    queryFn: () => getPatientDetails(pid),
    initialData: null,
  });
