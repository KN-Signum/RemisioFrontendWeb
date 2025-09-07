import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// Get symptoms by patient ID
const getSymptomsByPatientId = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/symptoms`,
  ({ params }) => {
    const { patientId } = params;
    console.log(
      '[MSW] Received request for symptoms with patientId:',
      patientId,
    );

    const symptoms = db.symptom
      .getAll()
      .filter((symptom) => symptom.patient_id === String(patientId));

    return HttpResponse.json(symptoms);
  },
);

export const handlers = [getSymptomsByPatientId];
