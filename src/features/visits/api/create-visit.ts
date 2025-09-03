import { apiClient } from '@/lib/api-client';
import { CreateVisitDto, GetVisitDto } from '../types';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const createVisit = (
  createVisitDto: CreateVisitDto,
): Promise<{
  data: GetVisitDto;
}> => {
  console.log('Creating visit:', createVisitDto);
  return apiClient.post('/visits', createVisitDto);
};

type UseCreateVisitOptions = {
  onSuccess?: (data: GetVisitDto) => void;
};

export const useCreateVisit = ({ onSuccess }: UseCreateVisitOptions) =>
  useMutation({
    mutationFn: createVisit,
    onSuccess: (result) => {
      const visit = result.data;
      queryClient.setQueryData(['visits'], (oldData: GetVisitDto[]) =>
        oldData ? [...oldData, visit] : oldData,
      );
      onSuccess?.(visit);
    },
  });
