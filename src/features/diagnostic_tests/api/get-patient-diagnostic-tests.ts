import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { DiagnosticTest, DiagnosticTestSchema } from '../utils/types';

export const getPatientDiagnosticTests = async (
  patientId: string,
): Promise<DiagnosticTest[]> => {
  const response = await apiClient.get(
    `/patients/${patientId}/diagnostic-tests`,
  );
  console.log('[API-CLIENT] fetching diagnostic tests for patient:', patientId);

  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data
      .map((test: unknown) => {
        const parseResult = DiagnosticTestSchema.safeParse(test);
        if (!parseResult.success) {
          console.error('Invalid diagnostic test:', parseResult.error.errors);
          return null;
        }
        return parseResult.data;
      })
      .filter((test): test is DiagnosticTest => test !== null);
  }
  return [];
};

export const usePatientDiagnosticTests = (patientId: string) =>
  useQuery({
    queryKey: ['diagnostic-tests', patientId],
    queryFn: () => getPatientDiagnosticTests(patientId),
    enabled: !!patientId,
    initialData: [],
  });
