import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { mockPatients } from './patients';
import { v4 as uuidv4 } from 'uuid';

const round2 = (n: number): number => Number(n.toFixed(2));

export const mockDiagnosticTests: DiagnosticTestDto[] = (() => {
  const tests: DiagnosticTestDto[] = [];

  mockPatients.forEach((patient) => {
    const testDates = [
      '2023-05-10T08:30:00Z',
      '2023-07-15T09:15:00Z',
      '2023-09-22T10:00:00Z',
      '2023-11-30T11:30:00Z',
      '2024-01-18T08:45:00Z',
      '2024-03-05T09:30:00Z',
      '2024-04-12T10:15:00Z',
      '2024-05-01T11:00:00Z',
      '2025-05-05T07:30:00Z',
      '2025-05-15T07:30:00Z',
    ];

    testDates.forEach((testDate, dateIndex) => {
      const timeOffset = (testDates.length - dateIndex) * 86_400_000; // ms w dniu
      const createdTime = new Date(Date.now() - timeOffset).toISOString();
      const updatedTime = new Date(Date.now() - timeOffset + 3_600_000).toISOString();

      const progress = dateIndex / (testDates.length - 1);

      /* ───── test 1 ───── */
      const test1: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,

        ldl: round2(130 - progress * 20 + Math.random() * 15),
        ast: round2(18 + Math.sin(dateIndex) * 10 + Math.random() * 8),
        bilirubin: round2(0.3 + Math.sin(dateIndex) * 0.3 + Math.random() * 0.4),
        alkaline_phosphatase: round2(65 + progress * 15 + Math.random() * 20),
        calprotectin_feces: round2(
          50 + progress * 100 * (Math.random() > 0.7 ? -1 : 1) + Math.random() * 30,
        ),
        creatinine_serum: round2(0.8 + Math.sin(dateIndex) * 0.2 + Math.random() * 0.3),

        created_at: createdTime,
        updated_at: updatedTime,
      };

      /* ───── test 2 ───── */
      const test2: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,

        hemoglobin: round2(13 + progress * 1.5 + Math.random() * 1),
        hct: round2(38 + progress * 4 + Math.random() * 3),
        basophils: round2(0.4 + Math.sin(dateIndex) * 0.3 + Math.random() * 0.3),
        erythroblasts: Math.floor(Math.random() * 3),
        erythrocytes: round2(4.2 + progress * 0.6 + Math.random() * 0.5),
        mch: round2(27 + Math.sin(dateIndex) * 2 + Math.random() * 1),
        mchc: round2(31 + Math.sin(dateIndex) * 2 + Math.random() * 1.5),
        leukocytes: round2(6 + Math.sin(dateIndex) * 1.5 + Math.random() * 1),
        plcr: round2(25 + Math.sin(dateIndex) * 5 + Math.random() * 3),

        created_at: new Date(Date.parse(createdTime) + 1_800_000).toISOString(),
        updated_at: new Date(Date.parse(updatedTime) + 1_800_000).toISOString(),
      };

      /* ───── test 3 ───── */
      const test3: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,

        cea: round2(2 + progress * 1 + Math.random() * 1),
        monocytes: round2(0.2 + Math.sin(dateIndex) * 0.2 + Math.random() * 0.3),
        mpv: round2(7 + Math.sin(dateIndex) * 1.5 + Math.random() * 1.5),
        neutrophils: round2(45 + Math.sin(dateIndex) * 10 + Math.random() * 10),
        potassium: round2(3.5 + Math.sin(dateIndex) * 0.5 + Math.random() * 0.5),

        glucose_urine: Math.floor(Math.random() * 2) * 50 + Math.floor(Math.random() * 20),
        bacteria_urine_count:
          Math.floor(Math.random() * 1000) * (Math.random() > 0.7 ? 1 : 0),

        hbe_positive: Math.random() > 0.9,
        parasite_feces_positive: Math.random() > 0.85,
        ob: Math.random() > 0.8 ? 5 + Math.floor(Math.random() * 5) : 0,

        created_at: new Date(Date.parse(createdTime) + 3_600_000).toISOString(),
        updated_at: new Date(Date.parse(updatedTime) + 3_600_000).toISOString(),
      };

      tests.push(test1, test2, test3);
    });
  });

  return tests;
})();
