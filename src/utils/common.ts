import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PATIENT_STATES, PatientState } from '@/utils/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateState(score: number): PatientState {
  if (score >= 8) return PATIENT_STATES.remission;
  if (score >= 6) return PATIENT_STATES.mild;
  if (score >= 4) return PATIENT_STATES.moderate;
  return PATIENT_STATES.severe;
}

// ——— helper ——— (probably not needed in production)
export const formatValue = (raw: string) => {
  // captures   1️⃣ first numeric part   2️⃣ everything after it
  const match = raw.match(
    /^([-+]?\d*[.,]?\d+(?:[eE][-+]?\d+)?)(.*)$/, // <- [.,]  (no back-slash)
  );
  if (!match) return raw;

  const [, numStr, suffix] = match;
  const n = parseFloat(numStr.replace(',', '.'));
  if (Number.isNaN(n)) return raw;

  return `${n.toFixed(2)}${suffix}`;
};

export function formatDateDisplay(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}
