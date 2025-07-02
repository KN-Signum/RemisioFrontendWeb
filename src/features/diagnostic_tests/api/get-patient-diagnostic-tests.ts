import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { GetPatientDiagnosticTestsDto } from '../types';

export const getPatientDiagnosticTests = async (
  patientId: string,
  testDate?: string,
): Promise<GetPatientDiagnosticTestsDto> => {
  const url = testDate
    ? `/api/diagnostic_tests/${patientId}?test_date=${encodeURIComponent(testDate)}`
    : `/api/diagnostic_tests/${patientId}`;

  const { data } = await apiClient.get(url);
  console.log(
    '[API-CLIENT] fetching diagnostic tests for patient:',
    patientId,
    'on date:',
    testDate,
  );
  return data.content;
};

export const usePatientDiagnosticTests = (
  patientId: string,
  testDate?: string,
) =>
  useQuery({
    queryKey: ['diagnostic-tests', patientId, testDate],
    queryFn: () => getPatientDiagnosticTests(patientId, testDate),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
