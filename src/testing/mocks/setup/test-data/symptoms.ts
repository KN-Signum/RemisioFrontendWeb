import { SymptomDto } from '@/features/symptoms/types';

function getFormattedDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
}

export const mockSymptoms: SymptomDto[] = [
  {
    id: 'symptom001',
    patient_id: 'p001',
    symptom_type: 'Abdominal Pain',
    duration: '2-3 hours',
    pain: 6,
    additional_description: 'Sharp pain after meals, mostly on the right side',
    date_added: getFormattedDate(-30),
  },
  {
    id: 'symptom002',
    patient_id: 'p001',
    symptom_type: 'Fatigue',
    duration: 'All day',
    pain: 1,
    additional_description: 'Constant tiredness despite adequate sleep',
    date_added: getFormattedDate(-25),
  },
  {
    id: 'symptom003',
    patient_id: 'p001',
    symptom_type: 'Joint Pain',
    duration: '1-2 hours',
    pain: 2,
    additional_description: 'Stiffness in fingers and wrists upon waking',
    date_added: getFormattedDate(-20),
  },
  {
    id: 'symptom004',
    patient_id: 'p002',
    symptom_type: 'Diarrhea',
    duration: '4-5 hours',
    pain: 8,
    additional_description: 'Frequent bloody stools with mucus',
    date_added: getFormattedDate(-15),
  },
  {
    id: 'symptom005',
    patient_id: 'p002',
    symptom_type: 'Abdominal Cramping',
    duration: '1-2 hours',
    pain: 7,
    additional_description: 'Comes in waves, worse after eating',
    date_added: getFormattedDate(-10),
  },
  {
    id: 'symptom006',
    patient_id: 'p003',
    symptom_type: 'Nausea',
    duration: '30 minutes',
    pain: 4,
    additional_description: 'Feeling of sickness after breakfast, no vomiting',
    date_added: getFormattedDate(-5),
  },
  {
    id: 'symptom007',
    patient_id: 'p003',
    symptom_type: 'Fever',
    duration: '3-4 hours',
    pain: 2,
    additional_description: 'Low-grade fever in the evenings with mild chills',
    date_added: getFormattedDate(-2),
  },
  {
    id: 'symptom008',
    patient_id: 'p004',
    symptom_type: 'Weight Loss',
    duration: '1 week',
    pain: 3,
    additional_description: 'Unintentional loss of 2kg despite normal appetite',
    date_added: getFormattedDate(-1),
  },
  {
    id: 'symptom009',
    patient_id: 'p005',
    symptom_type: 'Joint Pain',
    duration: 'All day',
    pain: 8,
    additional_description: 'Severe pain in knees and ankles limiting mobility',
    date_added: getFormattedDate(0),
  },
  {
    id: 'symptom010',
    patient_id: 'p006',
    symptom_type: 'Mouth Sores',
    duration: '3 days',
    pain: 5,
    additional_description: 'Small painful ulcers inside cheeks and on tongue',
    date_added: getFormattedDate(-7),
  },
];
