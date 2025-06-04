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

// Helper function to determine patient state based on score and disease type
const getPatientState = (score: number, diseaseType: string): string => {
  if (diseaseType === 'crohn') {
    // Crohn's Disease (CDAI score: 0-450)
    if (score < 150) return 'Remission';
    if (score < 220) return 'Mild';
    if (score < 350) return 'Moderate';
    return 'Severe';
  } else {
    // Ulcerative Colitis (Mayo score: 0-12)
    if (score <= 2) return 'Remission';
    if (score <= 5) return 'Mild';
    if (score <= 8) return 'Moderate';
    return 'Severe';
  }
};

const getTablePatients = http.get(`${API_URL}/api/get_patients_table`, () => {
  const doctorId = 'd001';
  const patients = db.patient
    .getAll()
    .filter((patient) => patient.doctor_id === doctorId)
    .map((patient) => {
      // Get the latest score for this patient
      const patientScores = db.patientScore
        .getAll()
        .filter((score) => score.patient_id === patient.id)
        .sort((a, b) => new Date(b.score_date).getTime() - new Date(a.score_date).getTime());

      // Use the latest score or default to 0 if no scores exist
      const latestScore = patientScores.length > 0 ? patientScores[0].score : 0;

      return {
        id: patient.id,
        name: patient.name,
        disease:
          patient.disease_type === 'crohn'
            ? "Crohn's Disease"
            : 'Ulcerative Colitis',
        state: getPatientState(latestScore, patient.disease_type),
        last_visit: new Date(patient.updated_at).toLocaleDateString(),
        drugs:
          patient.disease_type === 'crohn'
            ? 'Infliximab, Azathioprine'
            : 'Mesalazine, Prednisone',
      };
    });

  return HttpResponse.json({ status: 200, content: patients });
});

export const handlers = [getAllPatients, getTablePatients];
