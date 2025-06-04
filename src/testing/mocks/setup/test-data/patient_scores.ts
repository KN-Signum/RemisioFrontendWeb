import { PatientScoreDto } from '@/features/score';
import { mockPatients } from './patients';
import { v4 as uuidv4 } from 'uuid';

export const mockPatientScores: PatientScoreDto[] = (() => {
    const scores: PatientScoreDto[] = [];

    // Create sample scores for each patient
    mockPatients.forEach((patient) => {
        // Create scores for different dates
        const scoreDates = [
            '2025-05-01T07:30:00Z',
            '2025-05-10T07:30:00Z',
            '2025-05-20T07:30:00Z'
        ];

        scoreDates.forEach((scoreDate, index) => {
            // Generate a score between 0 and 10
            const score = Math.floor(Math.random() * 11);

            const patientScore: PatientScoreDto = {
                id: uuidv4(),
                patient_id: patient.id,
                score_date: scoreDate,
                score: score,
                notes: `Patient score notes for ${patient.name} on ${scoreDate}`,
                created_at: new Date(Date.now() - (3600000 * (index + 1))).toISOString(),
                updated_at: new Date(Date.now() - (3600000 * (index + 1))).toISOString()
            };

            scores.push(patientScore);
        });
    });

    return scores;
})();