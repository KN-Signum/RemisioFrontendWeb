export const PATIENT_STATES = {
  remission: 'remission',
  mild: 'mild',
  moderate: 'moderate',
  severe: 'severe',
} as const;

export type PatientState = keyof typeof PATIENT_STATES;

export const GENDERS = {
  male: 'male',
  female: 'female',
  other: 'other',
} as const;

export type GenderType = keyof typeof GENDERS;

export const TIME_RANGES = {
  month: 'month',
  year: 'year',
  all: 'all',
} as const;

export type TimeRange = keyof typeof TIME_RANGES;

export const STATUSES = {
  low: 'low',
  normal: 'normal',
  high: 'high',
} as const;

export type Status = keyof typeof STATUSES;

export const DISEASE_TYPES = {
  crohn: 'crohn',
  ulcerative_colitis: 'ulcerative_colitis',
} as const;

export type DiseaseType = keyof typeof DISEASE_TYPES;

export type Limits = { low: number; high: number };
