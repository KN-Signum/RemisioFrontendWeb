export const API_URL =
  import.meta.env.VITE_PUBLIC_API_URL ?? 'http://127.0.0.1:8000';

export const API_MOCKING = import.meta.env.VITE_PUBLIC_API_MOCKING === 'true';
export const ENABLE_MSW_DEVTOOLS =
  import.meta.env.VITE_PUBLIC_ENABLE_MSW_DEVTOOLS === 'true';

export const IS_DEVELOPMENT = import.meta.env.VITE_PUBLIC_ENV === 'development';
export const IS_TEST = import.meta.env.VITE_PUBLIC_ENV === 'test';
export const IS_PRODUCTION = import.meta.env.VITE_PUBLIC_ENV === 'production';
