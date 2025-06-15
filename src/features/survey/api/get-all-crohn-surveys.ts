import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
    CrohnSurveyDto,
    GetPatientSurveysDto,
} from '../types';

/**
 * GET /patients/:id/surveys/crohn
 * Retrieves all Crohn's disease surveys for a patient
 */
export const getPatientCrohnSurveys = async (
    patientId: string,
): Promise<GetPatientSurveysDto<CrohnSurveyDto>> => {
    const response = await apiClient.get(
        `/api/patients/${patientId}/surveys/crohn`,
    );
    console.log('[API-CLIENT] ←', response.data);
    return response.data.content;
};

export const usePatientCrohnSurveys = (patientId: string) => {
    return useQuery({
        queryKey: ['patient', patientId, 'crohn-surveys'],
        queryFn: () => getPatientCrohnSurveys(patientId),
        enabled: !!patientId,
        staleTime: 5 * 60 * 1000,
    });
};