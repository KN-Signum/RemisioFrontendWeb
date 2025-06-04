import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { CreatePatientScoreDto, PatientScoreDto } from '@/features/score';
import { v4 as uuidv4 } from 'uuid';

// POST endpoint to create a patient score
export const createPatientScore = http.post(
    `${API_URL}/api/patient_scores`,
    async ({ request }) => {
        const data = await request.json() as CreatePatientScoreDto;
        console.log('[MSW] Create patient score', data);

        // Generate a new UUID for the score
        const id = uuidv4();
        const now = new Date().toISOString();

        // Store the score in the database
        db.patientScore.create({
            id,
            ...data,
            created_at: now,
            updated_at: now
        });

        return HttpResponse.json({
            status: 201,
            content: { id }
        });
    }
);

// GET endpoint to retrieve patient scores
export const getPatientScores = http.get(
    `${API_URL}/api/patient_scores/:patientId`,
    ({ params, request }) => {
        console.log('[MSW] Get patient scores', params);
        const { patientId } = params as { patientId: string };

        // Get the score_date query parameter if it exists
        const url = new URL(request.url);
        const scoreDate = url.searchParams.get('score_date');

        // Get all scores for the patient
        let scores = db.patientScore
            .getAll()
            .filter((score) => score.patient_id === patientId);

        // Filter by score_date if provided
        if (scoreDate) {
            scores = scores.filter((score) => score.score_date === scoreDate);
        }

        // Sort scores by score_date (newest first)
        scores.sort((a, b) =>
            new Date(b.score_date).getTime() - new Date(a.score_date).getTime()
        );

        return HttpResponse.json({
            status: 200,
            content: {
                patient_id: patientId,
                scores: scores
            }
        });
    }
);

export const handlers = [
    createPatientScore,
    getPatientScores
];