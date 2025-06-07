import { API_URL } from '@/config/constants';
import { MealDto } from '../types';

/**
 * Fetches all meals for a patient
 * @param patientId - ID of the patient
 * @returns Promise with array of meal data
 */
export const getMealsByPatientId = async (patientId: string): Promise<MealDto[]> => {
    try {
        const response = await fetch(`${API_URL}/api/meals/${patientId}`);

        if (!response.ok) {
            throw new Error(`Error fetching meals: ${response.status}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Failed to fetch meals:', error);
        throw error;
    }
};