import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { CreatePatientScoreDto } from '../types';

export const createPatientScore = async (
  data: CreatePatientScoreDto,
): Promise<{ id: string }> => {
  const { data: response } = await apiClient.post('/api/patient_scores', data);
  console.log('[API-CLIENT] ←', response);
  return response.content;
};

type UseCreatePatientScoreOptions = {
  onSuccess?: (data: { id: string }) => void;
};

export const useCreatePatientScore = ({
  onSuccess,
}: UseCreatePatientScoreOptions = {}) => {
  const { mutate: create, isPending } = useMutation({
    mutationFn: createPatientScore,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['patient-scores'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      onSuccess?.(result);
    },
    onError: (error) => {
      console.error('Error creating patient score:', error);
      // Handle error (e.g., show a notification)
    },
  });

  return { create, isPending };
};
