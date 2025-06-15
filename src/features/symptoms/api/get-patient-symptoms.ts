import { apiClient } from '@/lib/api-client';

// Get all symptoms for a patient
export const getSymptomsByPatientId = async (patientId: string) => {
  const response = await apiClient.get(`/api/symptoms/${patientId}`);
  return response.data.content;
};
