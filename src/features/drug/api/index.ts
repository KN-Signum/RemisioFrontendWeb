import { API_URL } from '@/config/constants';
import { DrugDto } from '../types';

/**
 * Fetches all drugs for a patient
 * @param patientId - ID of the patient
 * @returns Promise with array of drug data
 */
export const getDrugsByPatientId = async (patientId: string): Promise<DrugDto[]> => {
    try {
        const response = await fetch(`${API_URL}/api/drugs/${patientId}`);

        if (!response.ok) {
            throw new Error(`Error fetching drugs: ${response.status}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Failed to fetch drugs:', error);
        throw error;
    }
};