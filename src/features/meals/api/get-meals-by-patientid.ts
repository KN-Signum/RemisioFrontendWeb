import { useQuery } from '@tanstack/react-query';
import { MealDto } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const getMealsByPatientId = async (
  patientId: string,
): Promise<MealDto[]> => {
  if (!patientId) throw new Error('patientId is required');
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get(`/patients/${patientId}/meals`);
  console.log('[API-CLIENT] fetching meals for patient:', patientId);
  return response.data;
};

export const useMealsByPatientId = (patientId: string) =>
  useQuery({
    queryKey: ['meals', patientId],
    queryFn: () => getMealsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });
