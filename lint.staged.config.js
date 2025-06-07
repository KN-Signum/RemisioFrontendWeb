export default {
  '*.{ts,tsx}': [
    'npm run lint',
    () => "npm run types:check",
  ],
};