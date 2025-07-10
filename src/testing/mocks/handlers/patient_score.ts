import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// GET endpoint to retrieve patient scores
export const getPatientScores = http.get<{ patientId: string }>(
  `${API_URL}/scores/:patientId`,
  ({ params, request }) => {
    console.log('[MSW] Get patient scores', params);
    const { patientId } = params;

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
    scores.sort(
      (a, b) =>
        new Date(b.score_date).getTime() - new Date(a.score_date).getTime(),
    );

    return HttpResponse.json({
      status: 200,
      content: {
        patient_id: patientId,
        scores: scores,
      },
    });
  },
);

export const handlers = [getPatientScores];
