import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// Get drugs by patient ID
const getDrugsByPatientId = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/drugs`,
  ({ params }) => {
    const { patientId } = params;
    const drugs = db.drug
      .getAll()
      .filter((drug) => drug.patientId === patientId);

    return HttpResponse.json({ status: 200, content: drugs });
  },
);

export const handlers = [getDrugsByPatientId];
