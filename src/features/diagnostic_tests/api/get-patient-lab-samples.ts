import { useQuery } from "@tanstack/react-query";
import { GetPatientLabSamplesDto } from "../types";
import { apiClient } from '@/lib/api-client';

export const getPatientLabSamples = async (
    patientId: string,
): Promise<GetPatientLabSamplesDto> => {
    const { data } = await apiClient.get(
        `/api/get_patient_lab_samples/${patientId}`,
    );
    console.log('[API-CLIENT] ←', data);
    return data.content;
};

export const usePatientLabSamples = (patientId: string) =>
    useQuery({
        queryKey: ['lab-samples', patientId],
        queryFn: () => getPatientLabSamples(patientId),
        enabled: !!patientId,
        staleTime: 5 * 60 * 1000,
    });