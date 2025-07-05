import { Analyte } from '@/features/diagnostic_tests'

type Limits = { low: number; high: number }

export const analyteLimits: Record<Analyte, Limits> = {
    cea: { low: 0, high: 4 },
    ldl: { low: 0, high: 100 },
    hbe_positive: { low: 0, high: 0 },
    parasite_feces_positive: { low: 0, high: 0 },
    calprotectin_feces: { low: 0, high: 50 },
    creatinine_serum: { low: 0.6, high: 1.3 },
    glucose_urine: { low: 0, high: 0 },
    bacteria_urine_count: { low: 0, high: 300 },
    erythrocytes: { low: 4.0, high: 5.4 },
    hemoglobin: { low: 12, high: 16 },
    mch: { low: 27, high: 33 },
    plcr: { low: 0, high: 45 },
    hct: { low: 36, high: 46 },
    leukocytes: { low: 4, high: 10 },
    ob: { low: 0, high: 0 },
    ast: { low: 0, high: 40 },
    bilirubin: { low: 0, high: 1.2 },
    alkaline_phosphatase: { low: 40, high: 130 },
    basophils: { low: 0, high: 1 },
    erythroblasts: { low: 0, high: 0 },
    mchc: { low: 32, high: 36 },
    monocytes: { low: 0, high: 1 },
    mpv: { low: 7, high: 12 },
    neutrophils: { low: 40, high: 75 },
    potassium: { low: 3.5, high: 5 },
    hematocrit: { low: 36, high: 46 },
}

export const classify = (
    analyte: Analyte,
    numeric: number | null,
): 'low' | 'normal' | 'high' => {
    if (numeric === null) return 'normal'
    const { low, high } = analyteLimits[analyte] ?? { low: -Infinity, high: Infinity }
    if (numeric < low) return 'low'
    if (numeric > high) return 'high'
    return 'normal'
}
