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
    pain_level: 'Severe',
    symptom_description: 'Sharp pain after meals, mostly on the right side',
    created_at: getFormattedDate(-30),
  },
  {
    id: 'symptom002',
    patient_id: 'p001',
    symptom_type: 'Fatigue',
    duration: 'All day',
    pain_level: 'Moderate',
    symptom_description: 'Constant tiredness despite adequate sleep',
    created_at: getFormattedDate(-25),
  },
  {
    id: 'symptom003',
    patient_id: 'p001',
    symptom_type: 'Joint Pain',
    duration: '1-2 hours',
    pain_level: 'Mild',
    symptom_description: 'Stiffness in fingers and wrists upon waking',
    created_at: getFormattedDate(-20),
  },
  {
    id: 'symptom004',
    patient_id: 'p002',
    symptom_type: 'Diarrhea',
    duration: '4-5 hours',
    pain_level: 'Very Severe',
    symptom_description: 'Frequent bloody stools with mucus',
    created_at: getFormattedDate(-15),
  },
  {
    id: 'symptom005',
    patient_id: 'p002',
    symptom_type: 'Abdominal Cramping',
    duration: '1-2 hours',
    pain_level: 'Severe',
    symptom_description: 'Comes in waves, worse after eating',
    created_at: getFormattedDate(-10),
  },
  {
    id: 'symptom006',
    patient_id: 'p003',
    symptom_type: 'Nausea',
    duration: '30 minutes',
    pain_level: 'Moderate',
    symptom_description: 'Feeling of sickness after breakfast, no vomiting',
    created_at: getFormattedDate(-5),
  },
  {
    id: 'symptom007',
    patient_id: 'p003',
    symptom_type: 'Fever',
    duration: '3-4 hours',
    pain_level: 'Mild',
    symptom_description: 'Low-grade fever in the evenings with mild chills',
    created_at: getFormattedDate(-2),
  },
  {
    id: 'symptom008',
    patient_id: 'p004',
    symptom_type: 'Weight Loss',
    duration: '1 week',
    pain_level: 'Moderate',
    symptom_description: 'Unintentional loss of 2kg despite normal appetite',
    created_at: getFormattedDate(-1),
  },
  {
    id: 'symptom009',
    patient_id: 'p005',
    symptom_type: 'Joint Pain',
    duration: 'All day',
    pain_level: 'Very Severe',
    symptom_description: 'Severe pain in knees and ankles limiting mobility',
    created_at: getFormattedDate(0),
  },
  {
    id: 'symptom010',
    patient_id: 'p006',
    symptom_type: 'Mouth Sores',
    duration: '3 days',
    pain_level: 'Moderate',
    symptom_description: 'Small painful ulcers inside cheeks and on tongue',
    created_at: getFormattedDate(-7),
  },
];
