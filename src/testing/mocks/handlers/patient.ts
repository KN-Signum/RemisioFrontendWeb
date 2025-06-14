import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

function getAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

function getState(score: number): string {
  if (score >= 8) return 'Remission';
  if (score >= 6) return 'Mild';
  if (score >= 4) return 'Moderate';
  return 'Severe';
}

const getAllPatients = http.get(`${API_URL}/api/get_all_patients`, () => {
  // filter all visits by doctor_id to be "1"
  const doctorId = 'd001';
  const patients = db.patient
    .getAll()
    .filter((patient) => patient.doctor_id === doctorId)
    .map((patient) => ({
      id: patient.id,
      full_name: patient.name,
      gender: patient.gender,
      disease: patient.disease_type,
      state: getState(patient.score),
      last_visit: new Date(patient.updated_at),
      drugs: patient.drugs,
      age: getAge(patient.date_of_birth),
      score: patient.score,
      surveys: patient.surveys,
      diet: patient.diet,
      weight: patient.weight,
    }));

  return HttpResponse.json(patients);
});

const getPatientDetails = http.get<{ pid: string }>(
  `${API_URL}/api/patients/:pid`,
  ({ params }) => {
    const { pid } = params;
    const patient = db.patient.findFirst({
      where: {
        id: {
          equals: pid,
        },
      },
    });
    if (!patient) {
      return HttpResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    return HttpResponse.json({
      id: patient.id,
      hospital: patient.hospital,
      phone: patient.phone_number,
      email: patient.email,
      notes: patient.notes,
      smoking: patient.smoking,
    });
  },
);

export const handlers = [getAllPatients, getPatientDetails];
