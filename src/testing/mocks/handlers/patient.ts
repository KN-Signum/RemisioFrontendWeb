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

export const handlers = [getAllPatients];
