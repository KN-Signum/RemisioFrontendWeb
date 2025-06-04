import { apiClient } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePatientScoreDto } from '../types';

export const createPatientScore = async (
    data: CreatePatientScoreDto
): Promise<{ id: string }> => {
    const { data: response } = await apiClient.post(
        '/api/patient_scores',
        data
    );
    console.log('[API-CLIENT] ←', response);
    return response.content;
};

export const useCreatePatientScore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPatientScore,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patient-scores'] });
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
    });
};