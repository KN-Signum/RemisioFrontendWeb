export type ErrorType = 'API' | 'NETWORK' | 'APP';
export type ErrorAction = 'REPORT' | 'NOTIFY';
export type MyErrorOptionsType = {
  status?: number;
  context?: Record<string, unknown>;
};
