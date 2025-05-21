import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';

const getVisits = http.get(`${API_URL}/api/view_user_visits`, () => {
  // filter all visits by doctor_id to be "1"
  const doctorId = '1';
  const visits = db.visit
    .getAll()
    .filter((visit) => visit.doctor_id === doctorId);

  const formattedVisits = visits.map((visit) => ({
    id: visit.id,
    patient_id: visit.patient_id,
    name: visit.name,
    time_start: new Date(visit.time_start),
    time_end: new Date(visit.time_end),
    additional_info: visit.additional_info,
  }));

  return HttpResponse.json({ status: 200, content: formattedVisits });
});

export const handlers = [getVisits];
