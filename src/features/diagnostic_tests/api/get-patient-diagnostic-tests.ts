import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { GetPatientDiagnosticTestsDto } from '../types';

export const getPatientDiagnosticTests = async (
  patientId: string,
): Promise<GetPatientDiagnosticTestsDto> => {
  const { data } = await apiClient.get(
    `/patients/${patientId}/diagnostic-tests`,
  );
  console.log('[API-CLIENT] fetching diagnostic tests for patient:', patientId);
  return data.content;
};

export const usePatientDiagnosticTests = (patientId: string) =>
  useQuery({
    queryKey: ['diagnostic-tests', patientId],
    queryFn: () => getPatientDiagnosticTests(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
