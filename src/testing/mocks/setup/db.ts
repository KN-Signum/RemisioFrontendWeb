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
    date_of_birth: String,
    score: Number,
    smoking: String,
    gender: String, // 'male' | 'female' | 'other'
    disease_type: String, // 'crohn' | 'ulcerative_colitis'
    last_visit: String, // ISO timestamp
    drugs: Array<string>,
    surveys: Number,
    diet: String,
    hospital: String,
    notes: String, // was `notes_about_patient`
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

  diagnosticTest: {
    id: primaryKey(String),
    patient_id: String,
    test_date: String,
    cea: Number,
    ldl: Number,
    hbe_positive: Boolean,
    parasite_feces_positive: Boolean,
    calprotectin_feces: Number,
    creatinine_serum: Number,
    glucose_urine: Number,
    bacteria_urine_count: Number,
    erythrocytes: Number,
    hemoglobin: Number,
    mch: Number,
    hct: Number,
    leukocytes: Number,
    plcr: Number,
    ob: Number,
    test_notes: String,
    created_at: String,
    updated_at: String,
  },
};

export const db = factory(models);
