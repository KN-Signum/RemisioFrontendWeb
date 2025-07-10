import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { CreateVisitDto } from '@/features/visits';

const addTwoHours = (dateString: Date): string => {
  const date = new Date(dateString);
  return new Date(date.getTime() + 2 * 3600000).toISOString();
};

const getAllVisits = http.get(`${API_URL}/visits`, () => {
  // filter all visits by doctor_id to be "1"
  const doctorId = 'd001';
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

const addVisit = http.post(`${API_URL}/visits`, async ({ request }) => {
  const { patient_id, name, time_start, time_end, additional_info } =
    (await request.json()) as CreateVisitDto;

  console.log('Adding visit:', {
    patient_id,
    name,
    time_start,
    time_end,
    additional_info,
  });

  const newVisit = db.visit.create({
    id: crypto.randomUUID(),
    patient_id,
    name,
    time_start: addTwoHours(time_start),
    time_end: addTwoHours(time_end),
    additional_info,
    doctor_id: '1', // hardcoded for testing purposes
  });

  return HttpResponse.json(newVisit);
});

export const handlers = [getAllVisits, addVisit];
