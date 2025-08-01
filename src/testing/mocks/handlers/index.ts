import { handlers as patientHandlers } from './patient';
import { handlers as visitHandlers } from './visit';
import { handlers as authHandlers } from './auth';
import { handlers as drugHandlers } from './drug';
import { handlers as labSampleHandlers } from './diagnostic_tests';
import { handlers as patientScoreHandlers } from './patient_score';
import { handlers as surveyHandlers } from './survey';
import { handlers as symptomHandlers } from './symptom';
import { handlers as mealHandlers } from './meal';

export const handlers = [
  ...authHandlers,
  ...patientHandlers,
  ...visitHandlers,
  ...drugHandlers,
  ...labSampleHandlers,
  ...patientScoreHandlers,
  ...surveyHandlers,
  ...symptomHandlers,
  ...mealHandlers,
];
