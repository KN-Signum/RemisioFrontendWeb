import { Analyte, analyteLimits } from '..';

export const classify = (
  analyte: Analyte,
  numeric: number | null,
): 'low' | 'normal' | 'high' => {
  if (numeric === null) return 'normal';
  const { low, high } = analyteLimits[analyte] ?? {
    low: -Infinity,
    high: Infinity,
  };
  if (numeric < low) return 'low';
  if (numeric > high) return 'high';
  return 'normal';
};
