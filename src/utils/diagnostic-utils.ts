import { Analyte, DiagnosticTestDto } from '@/features/diagnostic_tests'
import { classify } from './diagnostic-tests-treshold'

export type GridTest = {
    name: Analyte
    value: string
    status: 'low' | 'normal' | 'high'
    history: number[]
}

export const formatAnalyteValue = (
    k: Analyte,
    v: number | boolean,
): string => {
    if (typeof v === 'boolean') return v ? 'Positive' : 'Negative'
    switch (k) {
        case 'cea': return `${v} ng/mL`
        case 'ldl': return `${v} mg/dL`
        case 'calprotectin_feces': return `${v} µg/g`
        case 'hemoglobin': return `${v} g/dL`
        case 'hct':
        case 'basophils':
        case 'neutrophils':
        case 'hematocrit': return `${v} %`
        case 'leukocytes':
        case 'monocytes': return `${v} 10^3/µL`
        case 'erythrocytes': return `${v} 10^6/µL`
        case 'erythroblasts': return `${v} NRBC/100 WBC`
        case 'ast':
        case 'alkaline_phosphatase': return `${v} U/L`
        case 'bilirubin': return `${v} mg/dL`
        case 'mch': return `${v} pg`
        case 'mchc': return `${v} g/dL`
        case 'mpv': return `${v} fL`
        case 'potassium': return `${v} mmol/L`
        default: return v.toString()
    }
}

export const latestTestsToGrid = (
    data: { tests: DiagnosticTestDto[] } | undefined,
): GridTest[] => {
    if (!data?.tests?.length) return []
    const latest = [...data.tests].sort(
        (a, b) => +new Date(b.test_date) - +new Date(a.test_date),
    )[0]

    return (Object.entries(latest) as [Analyte | string, unknown][])
        .filter(
            ([k, v]) =>
                v !== null &&
                v !== undefined &&
                !['id', 'patient_id', 'test_date', 'created_at', 'updated_at', 'test_notes'].includes(k),
        )
        .map(([k, v]) => {
            const name = k as Analyte
            const numeric = typeof v === 'number' ? v : null
            const valueStr =
                typeof v === 'boolean'
                    ? v
                        ? 'Positive'
                        : 'Negative'
                    : v!.toString()
            const hist = data.tests
                .filter((t) => t[name] !== undefined && t[name] !== null)
                .sort((a, b) => +new Date(a.test_date) - +new Date(b.test_date))
                .map((t) => Number(t[name]))
            return {
                name,
                value: valueStr,
                status: classify(name, numeric),
                history: hist,
            }
        })
}
