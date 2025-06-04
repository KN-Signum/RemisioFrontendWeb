import { apiClient } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateDiagnosticTestDto } from '../types';

export const createDiagnosticTest = async (
  data: CreateDiagnosticTestDto,
): Promise<{ id: string }> => {
  const { data: response } = await apiClient.post(
    '/api/diagnostic_tests',
    data,
  );
  console.log('[API-CLIENT] ←', response);
  return response.content;
};

export const useCreateDiagnosticTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiagnosticTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnostic-tests'] });
      queryClient.invalidateQueries({ queryKey: ['lab-samples'] });
    },
  });
};
