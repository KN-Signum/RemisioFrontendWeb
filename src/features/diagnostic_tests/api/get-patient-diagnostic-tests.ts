import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { DiagnosticTestDto } from '../types';

export const getPatientDiagnosticTests = async (
  patientId: string,
): Promise<DiagnosticTestDto[]> => {
  const response = await apiClient.get(
    `/patients/${patientId}/diagnostic-tests`,
  );
  console.log('[API-CLIENT] fetching diagnostic tests for patient:', patientId);
  return response.data;
};

export const usePatientDiagnosticTests = (patientId: string) =>
  useQuery({
    queryKey: ['diagnostic-tests', patientId],
    queryFn: () => getPatientDiagnosticTests(patientId),
    enabled: !!patientId,
    initialData: [],
  });
