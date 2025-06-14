import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GetPatientDetailsDto } from '../types';

export const getPatientDetails = async (
  pid: string,
): Promise<GetPatientDetailsDto> => {
  console.log('Fetching patient details for PID:', pid);
  const response = await apiClient.get(`/api/patients/${pid}`);
  return response.data;
};

export const useGetPatientDetails = (pid: string) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['patientDetails', pid],
    queryFn: () => getPatientDetails(pid),
    initialData: null,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
