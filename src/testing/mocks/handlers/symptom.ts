import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

// Get symptoms by patient ID
const getSymptomsByPatientId = http.get(
  `${API_URL}/api/symptoms/:patient_id`,
  ({ params }) => {
    const { patient_id } = params;
    const symptoms = db.symptom
      .getAll()
      .filter((symptom) => symptom.patient_id === String(patient_id));

    return HttpResponse.json({ status: 200, content: symptoms });
  },
);

// Create new symptom
const createSymptom = http.post(
  `${API_URL}/api/symptoms`,
  async ({ request }) => {
    const symptomData = (await request.json()) as object;
    const newSymptom = db.symptom.create({
      ...symptomData,
      created_at: new Date().toISOString(),
    });

    return HttpResponse.json({ status: 201, content: newSymptom });
  },
);

// Update existing symptom
const updateSymptom = http.put(
  `${API_URL}/api/symptoms/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const symptomData = (await request.json()) as object;

    // Check if symptom exists
    const existingSymptom = db.symptom.findFirst({
      where: { id: { equals: String(id) } },
    });

    if (!existingSymptom) {
      return HttpResponse.json({
        status: 404,
        content: { message: 'Symptom not found' },
      });
    }

    // Update the symptom
    const updatedSymptom = db.symptom.update({
      where: { id: { equals: String(id) } },
      data: symptomData,
    });

    return HttpResponse.json({ status: 200, content: updatedSymptom });
  },
);

// Delete symptom
const deleteSymptom = http.delete(
  `${API_URL}/api/symptoms/:id`,
  ({ params }) => {
    const { id } = params;

    // Check if symptom exists
    const existingSymptom = db.symptom.findFirst({
      where: { id: { equals: String(id) } },
    });

    if (!existingSymptom) {
      return HttpResponse.json({
        status: 404,
        content: { message: 'Symptom not found' },
      });
    }

    // Delete the symptom
    db.symptom.delete({
      where: { id: { equals: String(id) } },
    });

    return HttpResponse.json({
      status: 200,
      content: { message: 'Symptom deleted successfully' },
    });
  },
);

export const handlers = [
  getSymptomsByPatientId,
  createSymptom,
  updateSymptom,
  deleteSymptom,
];
