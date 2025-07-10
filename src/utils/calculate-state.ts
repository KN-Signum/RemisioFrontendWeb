import { PatientState } from '@/types';

export function calculateState(score: number): PatientState {
  if (score >= 8) return 'Remission';
  if (score >= 6) return 'Mild';
  if (score >= 4) return 'Moderate';
  return 'Severe';
}
