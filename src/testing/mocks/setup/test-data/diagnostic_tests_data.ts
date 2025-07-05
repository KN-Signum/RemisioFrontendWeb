import { DiagnosticTestDto } from '@/features/diagnostic_tests'
import { mockPatients } from './patients'
import { v4 as uuidv4 } from 'uuid'

const round2 = (n: number) => Number(n.toFixed(2))

const buildDates = () => {
  const dates: string[] = []
  let d = new Date('2023-05-10T08:30:00Z')
  const today = new Date()
  while (d <= today) {
    dates.push(d.toISOString())
    d = new Date(d.getTime() + 42 * 86_400_000)
  }
  return dates
}

export const mockDiagnosticTests: DiagnosticTestDto[] = (() => {
  const tests: DiagnosticTestDto[] = []

  mockPatients.forEach((patient) => {
    const testDates = buildDates()

    testDates.forEach((testDate, idx) => {
      const progress = idx / (testDates.length - 1)

      const base = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,
        created_at: new Date(Date.parse(testDate) + 3_600_000).toISOString(),
        updated_at: new Date(Date.parse(testDate) + 7_200_000).toISOString(),
      }

      tests.push({
        ...base,

        ldl: round2(130 - progress * 20 + Math.random() * 15),
        ast: round2(18 + Math.sin(idx) * 10 + Math.random() * 8),
        bilirubin: round2(0.3 + Math.sin(idx) * 0.3 + Math.random() * 0.4),
        alkaline_phosphatase: round2(65 + progress * 15 + Math.random() * 20),

        hemoglobin: round2(13 + progress * 1.5 + Math.random() * 1),
        erythrocytes: round2(4.2 + progress * 0.6 + Math.random() * 0.5),

        calprotectin_feces: round2(
          50 +
          (progress > 0.5 ? -1 : 1) * progress * 120 +
          Math.random() * 40,
        ),

        hct: round2(38 + progress * 4 + Math.random() * 3),
        basophils: round2(0.4 + Math.sin(idx) * 0.3 + Math.random() * 0.3),
        erythroblasts: Math.floor(Math.random() * 3),
        mch: round2(27 + Math.sin(idx) * 2 + Math.random() * 1),
        mchc: round2(31 + Math.sin(idx) * 2 + Math.random() * 1.5),
        leukocytes: round2(6 + Math.sin(idx) * 1.5 + Math.random() * 1),
        plcr: round2(25 + Math.sin(idx) * 5 + Math.random() * 3),
        monocytes: round2(0.2 + Math.sin(idx) * 0.2 + Math.random() * 0.3),
        mpv: round2(7 + Math.sin(idx) * 1.5 + Math.random() * 1.5),
        neutrophils: round2(45 + Math.sin(idx) * 10 + Math.random() * 10),

        potassium: round2(3.5 + Math.sin(idx) * 0.5 + Math.random() * 0.5),
        glucose_urine: Math.random() > 0.8 ? 50 + Math.floor(Math.random() * 20) : 0,
        bacteria_urine_count:
          Math.random() > 0.75 ? Math.floor(Math.random() * 1000) : 0,

        cea: round2(2 + progress + Math.random()),
        hbe_positive: Math.random() > 0.93,
        parasite_feces_positive: Math.random() > 0.9,
        ob: Math.random() > 0.82 ? 5 + Math.floor(Math.random() * 5) : 0,
        creatinine_serum: round2(0.8 + Math.sin(idx) * 0.2 + Math.random() * 0.3),
      })
    })
  })

  return tests
})()
