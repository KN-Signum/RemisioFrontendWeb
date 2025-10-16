export default {
  '*.{ts,tsx}': [
    'eslint --fix --no-cache',
    () => 'npm run types:check',
  ],
}; 