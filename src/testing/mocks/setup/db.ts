import { factory, primaryKey } from '@mswjs/data';

const models = {
  patient: {
    id: primaryKey(String),
    doctor_id: String, // ID of the doctor assigned to the patient
    name: String,
    email: String,
    phone_number: String,
    weight: Number,
    height: Number,
    age: Number, // replaced date_of_birth with age
    score: Number,
    smoking: String,
    gender: String, // 'male' | 'female' | 'other'
    disease_type: String, // 'crohn' | 'ulcerative_colitis'
    hospital: String,
    notes_about_patient: String,
    updated_at: String, // ISO timestamp
  },
  visit: {
    id: primaryKey(String),
    patient_id: String,
    doctor_id: String,
    name: String,
    time_start: String, // ISO timestamp
    time_end: String, // ISO timestamp
    additional_info: String,
  },
  drug: {
    id: primaryKey(String),
    name: String,
    patientId: String,
    dosage: String,
    dateFrom: String,
    dateTo: String,
    additionalInfo: String,
    times: Array<string>,
  },
  labSample: {
    id: primaryKey(String),
    patientId: String,
    analyte: String,
    value: Number,
    unit: String,
    measuredAt: String,
  },
};

export const db = factory(models);
