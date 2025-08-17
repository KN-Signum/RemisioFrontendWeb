import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// Get meals by patient ID
const getMealsByPatientId = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/meals`,
  ({ params }) => {
    const { patientId } = params;
    const meals = db.meal
      .getAll()
      .filter((meal) => meal.patient_id === patientId);
    console.log('[MSW] Found meals:', meals);
    return HttpResponse.json({ status: 200, content: meals });
  },
);

export const handlers = [getMealsByPatientId];
