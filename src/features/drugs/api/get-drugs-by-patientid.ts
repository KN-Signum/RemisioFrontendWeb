import { apiClient } from '@/lib/api-client';
import { DrugDto } from '../types';
import { useQuery } from '@tanstack/react-query';

export const getDrugsByPatientId = async (
  patientId: string,
): Promise<DrugDto[]> => {
  if (!patientId) throw new Error('patientId is required');

  const res = await apiClient.get(`/drugs/${patientId}`);
  console.log('[API-CLIENT] fetching drugs for patient:', patientId);
  return res.data.content as DrugDto[];
};

export const useDrugsByPatientId = (patientId: string) => {
  const query = useQuery({
    queryKey: ['drugs', patientId],
    queryFn: () => getDrugsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });

  return {
    data: query.data || [],
    isLoading: query.isFetching && !query.isFetched,
  };
};
