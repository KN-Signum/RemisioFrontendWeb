/**
 * Analyte type representing the different types of analytes that can be measured in diagnostic tests.
 * The values correspond to keys in the i18n translation files under the "analytes" namespace.
 */
export type Analyte =
  | 'cea'
  | 'ldl'
  | 'hbe_positive'
  | 'parasite_feces_positive'
  | 'calprotectin_feces'
  | 'creatinine_serum'
  | 'glucose_urine'
  | 'bacteria_urine_count'
  | 'erythrocytes'
  | 'mch'
  | 'plcr'
  | 'hemoglobin'
  | 'hct'
  | 'leukocytes'
  | 'ob'
  | 'ast'
  | 'bilirubin'
  | 'alkaline_phosphatase'
  | 'basophils'
  | 'erythroblasts'
  | 'mchc'
  | 'monocytes'
  | 'mpv'
  | 'neutrophils'
  | 'potassium'
  | 'hematocrit';

// Diagnostic test types

export interface DiagnosticTestDto {
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
  test_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GetPatientDiagnosticTestsDto {
  patient_id: string;
  tests: DiagnosticTestDto[];
}
