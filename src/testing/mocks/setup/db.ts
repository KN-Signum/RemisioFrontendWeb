import { factory, nullable, primaryKey } from '@mswjs/data';

const models = {
  patient: {
    id: primaryKey(String),
    doctor_id: String, // ID of the doctor assigned to the patient
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    weight: Number,
    height: Number,
    date_of_birth: String,
    smoking: String,
    gender: String, // 'male' | 'female' | 'other'
    disease_type: String, // 'crohn' | 'ulcerative_colitis'
    hospital: String,
    notes_about_patient: String,
    last_score: Number,
    last_visit: String, // ISO timestamp or "None"
    age: Number,
    drugs: Array<string>,
    surveys: Number,
    diet: String,
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

  meal: {
    id: primaryKey(String),
    patient_id: String,
    meal_name: String,
    meal_date: String,
    image_url: String,
    ontology: String,
    meal_notes: String,
    created_at: String,
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
    ast: Number,
    bilirubin: Number,
    alkaline_phosphatase: Number,
    basophils: Number,
    erythroblasts: Number,
    mchc: Number,
    monocytes: Number,
    mpv: Number,
    neutrophils: Number,
    potassium: Number,
    hematocrit: Number,
    test_notes: String,
    created_at: String,
    updated_at: String,
  },

  patientScore: {
    id: primaryKey(String),
    total_score: Number,
    survey_score: Number,
    meal_score: nullable(Number),
    diagnostic_score: nullable(Number),
    disease_type: String,
    score_date: String,
    created_at: String,
  },

  // Crohn's Disease Survey
  crohnSurvey: {
    id: primaryKey(String),
    patient_id: String,
    survey_date: String,
    survey_type: String, // 'crohn'
    abdominal_pain: Number, // 0-3
    stools: Number, // 0-3
    general_wellbeing: Number, // 0-4
    extraintestinal_manifestations: Number, // 0-9
    antidiarrheal_use: Boolean, // true or false
    abdominal_mass: Number, // 0-5
    hematocrit: Number, // 0-4
    weight: Number, // 60-120
    total_score: Number,
    category: String, // 'remission' | 'mild' | 'moderate' | 'severe'
    notes: String,
    created_at: String,
    updated_at: String,
  },

  // Ulcerative Colitis Survey
  ucSurvey: {
    id: primaryKey(String),
    patient_id: String,
    survey_date: String,
    survey_type: String, // 'uc'
    stool_frequency: Number, // 0-3
    rectal_bleeding: Number, // 0-3
    physician_global: Number, // 0-3
    total_score: Number,
    category: String, // 'remission' | 'mild' | 'moderate' | 'severe'
    notes: String,
    created_at: String,
    updated_at: String,
  },

  // Symptoms
  symptom: {
    id: primaryKey(String),
    patient_id: String,
    symptom_type: String,
    duration: String,
    pain_level: String,
    symptom_description: String,
    created_at: String, // ISO timestamp
  },
};

export const db = factory(models);
