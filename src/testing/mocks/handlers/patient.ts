import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

const getAllPatients = http.get(`${API_URL}/patients`, () => {
  // filter all visits by doctor_id to be "1"
  const doctorId = 'd001';
  const patients = db.patient
    .getAll()
    .filter((patient) => patient.doctor_id === doctorId)
    .map((patient) => ({
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      gender: patient.gender,
      disease_type: patient.disease_type,
      last_visit: patient.last_visit,
      drugs: patient.drugs,
      age: patient.age,
      last_score: patient.last_score,
      surveys: patient.surveys,
      diet: patient.diet,
      weight: patient.weight,
    }));

  return HttpResponse.json(patients);
});

const getPatientDetails = http.get<{ pid: string }>(
  `${API_URL}/patients/:pid?view=basic`,
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
      phone_number: patient.phone_number,
      email: patient.email,
      notes_about_patient: patient.notes_about_patient,
      smoking: patient.smoking,
    });
  },
);

export const handlers = [getAllPatients, getPatientDetails];
