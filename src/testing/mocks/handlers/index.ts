import { handlers as appHealthHandlers } from './app-health-check';
import { handlers as patientHandlers } from './patients';
import { handlers as visitHandlers } from './visit';
import { handlers as authHandlers } from './auth';

export const handlers = [
  ...appHealthHandlers,
  ...authHandlers,
  ...patientHandlers,
  ...visitHandlers,
];
