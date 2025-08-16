import { apiClient } from '@/lib/api-client';
import { CreatePatientDto, GetPatientDto } from '../types';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const createPatient = (
  createPatientDto: CreatePatientDto,
): Promise<{
  data: GetPatientDto;
}> => {
  console.log('Creating patient:', createPatientDto);
  return apiClient.post('/api/create_patient', createPatientDto);
};

type UseCreatePatientrOptions = {
  onSuccess?: (data: GetPatientDto) => void;
};

export const useCreatePatient = ({
  onSuccess,
}: UseCreatePatientrOptions = {}) => {
  const { mutate: create, isPending: isLoading } = useMutation({
    mutationFn: createPatient,
    onMutate: (data) => {
      console.log('Creating patient:', data);
      // Optionally, you can show a loading state or a notification here
    },
    onSuccess: (result) => {
      const patient = result.data;
      queryClient.setQueryData(['patients'], (oldData: GetPatientDto[]) =>
        oldData ? [...oldData, patient] : oldData,
      );
      onSuccess?.(patient);
    },
    onError: (error) => {
      console.error('Error creating patient:', error);
      // Handle error (e.g., show a notification)
    },
  });

  return { create, isLoading };
};
