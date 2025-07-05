import { Analyte } from '..';

export const formatAnalyteValue = (k: Analyte, v: number | boolean): string => {
  if (typeof v === 'boolean') return v ? 'Positive' : 'Negative';
  switch (k) {
    case 'cea':
      return `${v} ng/mL`;
    case 'ldl':
      return `${v} mg/dL`;
    case 'calprotectin_feces':
      return `${v} µg/g`;
    case 'hemoglobin':
      return `${v} g/dL`;
    case 'hct':
    case 'basophils':
    case 'neutrophils':
    case 'hematocrit':
      return `${v} %`;
    case 'leukocytes':
    case 'monocytes':
      return `${v} 10^3/µL`;
    case 'erythrocytes':
      return `${v} 10^6/µL`;
    case 'erythroblasts':
      return `${v} NRBC/100 WBC`;
    case 'ast':
    case 'alkaline_phosphatase':
      return `${v} U/L`;
    case 'bilirubin':
      return `${v} mg/dL`;
    case 'mch':
      return `${v} pg`;
    case 'mchc':
      return `${v} g/dL`;
    case 'mpv':
      return `${v} fL`;
    case 'potassium':
      return `${v} mmol/L`;
    default:
      return v.toString();
  }
};
