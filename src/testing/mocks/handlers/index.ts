import { handlers as appHealthHandlers } from './app-health-check';
import { handlers as patientHandlers } from './patient';
import { handlers as visitHandlers } from './visit';
import { handlers as authHandlers } from './auth';
import { handlers as drugHandlers } from './drug';

export const handlers = [
  ...appHealthHandlers,
  ...authHandlers,
  ...patientHandlers,
  ...visitHandlers,
  ...drugHandlers,
];
