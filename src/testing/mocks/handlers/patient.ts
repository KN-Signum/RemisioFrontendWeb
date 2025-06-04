import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

const getAllPatients = http.get(`${API_URL}/api/get_all_patients`, () => {
  // filter all visits by doctor_id to be "1"
  const doctorId = 'd001';
  const patients = db.patient
    .getAll()
    .filter((patient) => patient.doctor_id === doctorId);

  return HttpResponse.json({ status: 200, content: patients });
});

// Helper function to determine patient state based on score
const getPatientState = (score: number): string => {
  if (score >= 8) return 'Remission';
  if (score >= 6) return 'Mild';
  if (score >= 4) return 'Moderate';
  return 'Severe';
};

const getTablePatients = http.get(`${API_URL}/api/get_patients_table`, () => {
  const doctorId = 'd001';
  const patients = db.patient
    .getAll()
    .filter((patient) => patient.doctor_id === doctorId)
    .map((patient) => ({
      id: patient.id,
      name: patient.name,
      disease:
        patient.disease_type === 'crohn'
          ? "Crohn's Disease"
          : 'Ulcerative Colitis',
      state: getPatientState(patient.score),
      last_visit: new Date(patient.updated_at).toLocaleDateString(),
      drugs:
        patient.disease_type === 'crohn'
          ? 'Infliximab, Azathioprine'
          : 'Mesalazine, Prednisone',
    }));

  return HttpResponse.json({ status: 200, content: patients });
});

export const handlers = [getAllPatients, getTablePatients];
