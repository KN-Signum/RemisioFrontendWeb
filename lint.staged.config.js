export default {
  '*.{ts,tsx}': [
    'eslint --fix --no-cache',
    () => 'npm run types:check',
  ],
}; 
// lintuje tylko zmienione pliki, a nie wszystkie w projekcie
// --no-cache - bez cache, bo czasem eslint nie widzi zmian w plikach
// types:check - sprawdza typy w zmienionych plikach