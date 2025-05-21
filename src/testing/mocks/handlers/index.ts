import { handlers as appHealthHandlers } from './app-health-check';
import { handlers as patientHandlers } from './patients';
import { handlers as visitHandlers } from './visit';

export const handlers = [
  ...appHealthHandlers,
  ...patientHandlers,
  ...visitHandlers,
];
