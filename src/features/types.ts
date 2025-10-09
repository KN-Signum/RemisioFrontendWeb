import { DISEASE_TYPES, DiseaseType } from '@/utils/types';
import { z } from 'zod';

export const DateSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  })
  .transform((val) => new Date(val));

export const DiseaseTypeSchema = z.enum(
  Object.values(DISEASE_TYPES) as [DiseaseType, ...DiseaseType[]],
);
