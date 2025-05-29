function getFormattedDate(offsetDays: number, hour: string): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:00:00`;
}

export const mockVisits = [
  {
    id: 'v001',
    patient_id: 'u001',
    doctor_id: 'd001',
    name: 'John Doe',
    time_start: getFormattedDate(0, '09'),
    time_end: getFormattedDate(0, '10'),
    additional_info: 'Follow-up appointment',
  },
  {
    id: 'v002',
    patient_id: 'u002',
    doctor_id: 'd001',
    name: 'Jane Smith',
    time_start: getFormattedDate(1, '09'),
    time_end: getFormattedDate(1, '11'),
    additional_info: 'Initial consultation',
  },
  {
    id: 'v003',
    patient_id: 'u003',
    doctor_id: 'd001',
    name: 'Michael Johnson',
    time_start: getFormattedDate(2, '15'),
    time_end: getFormattedDate(2, '16'),
    additional_info: 'Routine check-up',
  },
];
