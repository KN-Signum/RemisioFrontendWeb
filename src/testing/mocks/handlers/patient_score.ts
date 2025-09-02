import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// GET endpoint to retrieve patient scores
export const getPatientScores = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/scores`,
  ({ params }) => {
    console.log('[MSW] Get patient scores', params);

    // Get all scores for the patient
    const scores = db.patientScore.getAll();

    // Sort scores by score_date (newest first)
    scores.sort(
      (a, b) =>
        new Date(b.score_date).getTime() - new Date(a.score_date).getTime(),
    );

    return HttpResponse.json(scores);
  },
);

export const handlers = [getPatientScores];
