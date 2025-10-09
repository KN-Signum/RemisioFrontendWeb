import { Analyte } from '@/features/diagnostic_tests';
import { Limits } from '@/utils/types';

export const ANALYTES_LIST = [
  'cea',
  'ldl',
  'hbe_positive',
  'parasite_feces_positive',
  'calprotectin_feces',
  'creatinine_serum',
  'glucose_urine',
  'bacteria_urine_count',
  'erythrocytes',
  'hemoglobin',
  'mch',
  'plcr',
  'hct',
  'leukocytes',
  'ob',
  'ast',
  'bilirubin',
  'alkaline_phosphatase',
  'basophils',
  'erythroblasts',
  'mchc',
  'monocytes',
  'mpv',
  'neutrophils',
  'potassium',
  'hematocrit',
] as const;

export const ANALYTE_LIMITS_MAPPING: Record<Analyte, Limits> = {
  cea: { low: 0, high: 4 },
  ldl: { low: 0, high: 100 },
  hbe_positive: { low: 0, high: 0 },
  parasite_feces_positive: { low: 0, high: 0 },
  calprotectin_feces: { low: 0, high: 50 },
  creatinine_serum: { low: 0.6, high: 1.3 },
  glucose_urine: { low: 0, high: 0 },
  bacteria_urine_count: { low: 0, high: 300 },
  erythrocytes: { low: 4.0, high: 5.4 },
  hemoglobin: { low: 12, high: 16 },
  mch: { low: 27, high: 33 },
  plcr: { low: 0, high: 45 },
  hct: { low: 36, high: 46 },
  leukocytes: { low: 4, high: 10 },
  ob: { low: 0, high: 0 },
  ast: { low: 0, high: 40 },
  bilirubin: { low: 0, high: 1.2 },
  alkaline_phosphatase: { low: 40, high: 130 },
  basophils: { low: 0, high: 1 },
  erythroblasts: { low: 0, high: 0 },
  mchc: { low: 32, high: 36 },
  monocytes: { low: 0, high: 1 },
  mpv: { low: 7, high: 12 },
  neutrophils: { low: 40, high: 75 },
  potassium: { low: 3.5, high: 5 },
  hematocrit: { low: 36, high: 46 },
} as const;

export const ANALYTE_TO_UNIT_MAPPING = (
  analyteName: Analyte,
  analyteValue: number | boolean,
): string => {
  if (typeof analyteValue === 'boolean')
    return analyteValue ? 'Positive' : 'Negative';
  switch (analyteName) {
    case 'cea':
      return `ng/mL`;
    case 'bilirubin':
    case 'ldl':
      return `mg/dL`;
    case 'calprotectin_feces':
      return `µg/g`;
    case 'hemoglobin':
    case 'mchc':
      return `g/dL`;
    case 'hct':
    case 'basophils':
    case 'neutrophils':
    case 'hematocrit':
      return `%`;
    case 'leukocytes':
    case 'monocytes':
      return `10^3/µL`;
    case 'erythrocytes':
      return `10^6/µL`;
    case 'erythroblasts':
      return `NRBC/100 WBC`;
    case 'ast':
    case 'alkaline_phosphatase':
      return `U/L`;
    case 'mch':
      return `pg`;
    case 'mpv':
      return `fL`;
    case 'potassium':
      return `mmol/L`;
    default:
      return ``;
  }
};
