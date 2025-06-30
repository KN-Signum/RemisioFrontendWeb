import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UcSurveyDto, GetPatientSurveysDto } from '../types';

/**
 * GET /patients/:id/surveys/uc
 * Retrieves all UC surveys for a patient
 */
export const getPatientUcSurveys = async (
  patientId: string,
): Promise<GetPatientSurveysDto<UcSurveyDto>> => {
  const response = await apiClient.get(`/api/patients/${patientId}/surveys/uc`);
  console.log('[API-CLIENT] fetching UC surveys for patient:', patientId);
  return response.data.content;
};

export const usePatientUcSurveys = (patientId: string) => {
  const { data, isFetched, isFetching } = useQuery({
    queryKey: ['patient', patientId, 'uc-surveys'],
    queryFn: () => getPatientUcSurveys(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: data,
    isLoading: isFetching && !isFetched,
  };
};
