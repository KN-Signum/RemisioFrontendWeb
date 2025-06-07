import { apiClient } from '@/lib/api-client';
import { SymptomDto } from '../types';

// Get all symptoms for a patient
export const getSymptomsByPatientId = async (patientId: string) => {
    const response = await apiClient.get(`/api/symptoms/${patientId}`);
    return response.data.content;
};

// Create a new symptom
export const createSymptom = async (symptomData: SymptomDto) => {
    const response = await apiClient.post('/api/symptoms', symptomData);
    return response.data.content;
};

// Update an existing symptom
export const updateSymptom = async (id: string, symptomData: Partial<SymptomDto>) => {
    const response = await apiClient.put(`/api/symptoms/${id}`, symptomData);
    return response.data.content;
};

// Delete a symptom
export const deleteSymptom = async (id: string) => {
    const response = await apiClient.delete(`/api/symptoms/${id}`);
    return response.data.content;
};