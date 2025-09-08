import { z } from 'zod';

export type Analyte =
  | 'cea'
  | 'ldl'
  | 'hbe_positive'
  | 'parasite_feces_positive'
  | 'calprotectin_feces'
  | 'creatinine_serum'
  | 'glucose_urine'
  | 'bacteria_urine_count'
  | 'erythrocytes'
  | 'mch'
  | 'plcr'
  | 'hemoglobin'
  | 'hct'
  | 'leukocytes'
  | 'ob'
  | 'ast'
  | 'bilirubin'
  | 'alkaline_phosphatase'
  | 'basophils'
  | 'erythroblasts'
  | 'mchc'
  | 'monocytes'
  | 'mpv'
  | 'neutrophils'
  | 'potassium'
  | 'hematocrit';

export const DiagnosticTestSchema = z.object({
  id: z.string(),
  patient_id: z.string(),
  test_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  cea: z.number().optional(),
  ldl: z.number().optional(),
  hbe_positive: z.boolean().optional(),
  parasite_feces_positive: z.boolean().optional(),
  calprotectin_feces: z.number().optional(),
  creatinine_serum: z.number().optional(),
  glucose_urine: z.number().optional(),
  bacteria_urine_count: z.number().optional(),
  erythrocytes: z.number().optional(),
  hemoglobin: z.number().optional(),
  mch: z.number().optional(),
  hct: z.number().optional(),
  leukocytes: z.number().optional(),
  plcr: z.number().optional(),
  ob: z.number().optional(),
  ast: z.number().optional(),
  bilirubin: z.number().optional(),
  alkaline_phosphatase: z.number().optional(),
  basophils: z.number().optional(),
  erythroblasts: z.number().optional(),
  mchc: z.number().optional(),
  monocytes: z.number().optional(),
  mpv: z.number().optional(),
  neutrophils: z.number().optional(),
  potassium: z.number().optional(),
  hematocrit: z.number().optional(),
  test_notes: z.string().optional(),
  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
  updated_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),
});

export type DiagnosticTest = z.infer<typeof DiagnosticTestSchema>;
