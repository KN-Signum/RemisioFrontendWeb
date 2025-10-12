import { useQuery } from '@tanstack/react-query';
import { Drug, DrugSchema } from '../utils/types';
import { validArrayResponseData } from '@/features/common';
import { ApiClient } from '@/shared/api/ApiClient';

export const getDrugsByPatientId = async (
  patientId: string,
): Promise<Drug[]> => {
  const api = ApiClient.getInstance()
  const response = await api.getProtectedClient().get(`/patients/${patientId}/drugs`);
  console.log('[API-CLIENT] fetching drugs for patient:', patientId);

  if (validArrayResponseData(response.data)) {
    return response.data
      .map((drug: unknown) => {
        const parseResult = DrugSchema.safeParse(drug);
        if (!parseResult.success) {
          console.error('Invalid drug:', parseResult.error.errors);
          return null;
        }
        return parseResult.data;
      })
      .filter((drug: Drug | null): drug is Drug => drug !== null);
  }
  return [];
};

export const useDrugsByPatientId = (patientId: string) =>
  useQuery({
    queryKey: ['drugs', patientId],
    queryFn: () => getDrugsByPatientId(patientId),
    enabled: !!patientId,
    initialData: [],
  });
