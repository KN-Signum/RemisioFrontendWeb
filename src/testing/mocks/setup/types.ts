export type PatientJSON = {
  id: string;
  doctor_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  weight: number;
  height: number;
  date_of_birth: string;
  smoking: string;
  gender: string;
  disease_type: string;
  hospital: string;
  notes_about_patient: string;
  last_score: number;
  last_visit: string;
  age: number;
  drugs: string[];
  surveys: number;
  diet: string;
  updated_at: string;
};

export type VisitJSON = {
  id: string;
  patient_id: string;
  doctor_id: string;
  name: string;
  time_start: string;
  time_end: string;
  additional_info: string;
};

export type DrugJSON = {
  id: string;
  patient_id: string;
  drug_name: string;
  dosage: string;
  date_from: string;
  date_to: string;
  prescription_notes: string;
  created_at: string;
  updated_at: string;
};

export type MealJSON = {
  id: string;
  patient_id: string;
  meal_name: string;
  meal_date: string;
  image_url: string;
  ontology: string;
  meal_notes: string;
  created_at: string;
};

export type DiagnosticTestJSON = {
  id: string;
  patient_id: string;
  test_date: string;
  cea?: number;
  ldl?: number;
  hbe_positive?: boolean;
  parasite_feces_positive?: boolean;
  calprotectin_feces?: number;
  creatinine_serum?: number;
  glucose_urine?: number;
  bacteria_urine_count?: number;
  erythrocytes?: number;
  hemoglobin?: number;
  mch?: number;
  hct?: number;
  leukocytes?: number;
  plcr?: number;
  ob?: number;
  ast?: number;
  bilirubin?: number;
  alkaline_phosphatase?: number;
  basophils?: number;
  erythroblasts?: number;
  mchc?: number;
  monocytes?: number;
  mpv?: number;
  neutrophils?: number;
  potassium?: number;
  hematocrit?: number;
  test_notes: string;
  created_at: string;
  updated_at: string;
};

export type PatientScoreJSON = {
  id: string;
  total_score: number;
  survey_score: number;
  meal_score: number | null;
  diagnostic_score: number | null;
  disease_type: string;
  score_date: string;
  created_at: string;
};

export type CrohnSurveyJSON = {
  id: string;
  patient_id: string;
  survey_type: string;
  category: string;
  total_score: number;
  weight: number;
  notes: string;
  stools: number;
  abdominal_pain: number;
  general_wellbeing: number;
  antidiarrheal_use: boolean;
  extraintestinal_manifestations: number;
  abdominal_mass: number;
  hematocrit: number;
  created_at: string;
  updated_at: string | null;
};

export type UcSurveyJSON = {
  id: string;
  patient_id: string;
  survey_type: string;
  total_score: number;
  category: string;
  weight: number;
  notes: string;
  stool_frequency: number;
  rectal_bleeding: number;
  physician_global: number;
  created_at: string;
  updated_at: string | null;
};

export type SymptomJSON = {
  id: string;
  patient_id: string;
  symptom_type: string;
  duration: string;
  pain: number;
  additional_description: string;
  date_added: string;
};
