import { handlers as appHealthHandlers } from './app-health-check';
import { handlers as patientHandlers } from './patients';

export const handlers = [...appHealthHandlers, ...patientHandlers];
