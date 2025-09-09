import { getStringDate } from '../common';

export const mockVisits = [
  {
    id: 'v001',
    patient_id: 'p001',
    doctor_id: 'd001',
    name: 'John Doe',
    time_start: getStringDate(0, '09'),
    time_end: getStringDate(0, '10'),
    additional_info: 'Follow-up appointment',
  },
  {
    id: 'v002',
    patient_id: 'p002',
    doctor_id: 'd001',
    name: 'Jane Smith',
    time_start: getStringDate(1, '09'),
    time_end: getStringDate(1, '11'),
    additional_info: 'Initial consultation',
  },
  {
    id: 'v003',
    patient_id: 'p003',
    doctor_id: 'd001',
    name: 'Michael Johnson',
    time_start: getStringDate(2, '15'),
    time_end: getStringDate(2, '16'),
    additional_info: 'Routine check-up',
  },
];
