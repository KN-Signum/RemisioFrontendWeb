import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { mockPatients } from './patients';
import { v4 as uuidv4 } from 'uuid';

export const mockDiagnosticTests: DiagnosticTestDto[] = (() => {
  const tests: DiagnosticTestDto[] = [];

  // Create sample diagnostic tests for each patient
  mockPatients.forEach((patient) => {
    // Create test dates spanning the last year plus future dates
    const testDates = [
      // Past dates (last year)
      '2023-05-10T08:30:00Z',
      '2023-07-15T09:15:00Z',
      '2023-09-22T10:00:00Z',
      '2023-11-30T11:30:00Z',
      '2024-01-18T08:45:00Z',
      '2024-03-05T09:30:00Z',
      // Recent dates
      '2024-04-12T10:15:00Z',
      '2024-05-01T11:00:00Z',
      // Future dates
      '2025-05-05T07:30:00Z',
      '2025-05-15T07:30:00Z'
    ];

    testDates.forEach((testDate, dateIndex) => {
      // Calculate time offsets for created_at and updated_at
      // Older dates should have older timestamps
      const timeOffset = (testDates.length - dateIndex) * 86400000; // days in milliseconds
      const createdTime = new Date(Date.now() - timeOffset).toISOString();
      const updatedTime = new Date(Date.now() - timeOffset + 3600000).toISOString(); // 1 hour after creation

      // Generate trend values based on date index to show progression over time
      // Some values improve, some worsen, some fluctuate
      const dateProgress = dateIndex / (testDates.length - 1); // 0 to 1 progression factor

      // First partial test with ldl and liver function tests
      const test1: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,
        ldl: 130 - Math.floor(dateProgress * 20) + Math.floor(Math.random() * 15), // Improving trend
        ast: 18 + Math.floor(Math.sin(dateIndex) * 10) + Math.floor(Math.random() * 8), // Fluctuating
        bilirubin: 0.3 + Math.sin(dateIndex) * 0.3 + Math.random() * 0.4, // Fluctuating
        alkaline_phosphatase: 65 + Math.floor(dateProgress * 15) + Math.floor(Math.random() * 20), // Worsening trend
        calprotectin_feces: 50 + Math.floor(dateProgress * 100) * (Math.random() > 0.7 ? -1 : 1) + Math.floor(Math.random() * 30), // Variable trend
        creatinine_serum: 0.8 + Math.sin(dateIndex) * 0.2 + Math.random() * 0.3, // Fluctuating
        created_at: createdTime,
        updated_at: updatedTime,
      };

      // Second partial test with blood count tests
      const test2: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,
        hemoglobin: 13 + dateProgress * 1.5 + Math.random() * 1, // Improving trend
        hct: 38 + dateProgress * 4 + Math.floor(Math.random() * 3), // Improving trend
        basophils: 0.4 + Math.sin(dateIndex) * 0.3 + Math.random() * 0.3, // Fluctuating
        erythroblasts: Math.floor(Math.random() * 3),
        erythrocytes: 4.2 + dateProgress * 0.6 + Math.random() * 0.5, // Improving trend
        mch: 27 + Math.sin(dateIndex) * 2 + Math.random() * 1, // Fluctuating
        mchc: 31 + Math.sin(dateIndex) * 2 + Math.random() * 1.5, // Fluctuating
        leukocytes: 6 + Math.sin(dateIndex) * 1.5 + Math.random() * 1, // Fluctuating
        plcr: 25 + Math.sin(dateIndex) * 5 + Math.random() * 3, // Fluctuating
        created_at: new Date(Date.parse(createdTime) + 1800000).toISOString(), // 30 minutes after first test
        updated_at: new Date(Date.parse(updatedTime) + 1800000).toISOString(),
      };

      // Third partial test with other tests
      const test3: DiagnosticTestDto = {
        id: uuidv4(),
        patient_id: patient.id,
        test_date: testDate,
        cea: 2 + dateProgress * 1 + Math.random() * 1, // Worsening trend (higher is worse)
        monocytes: 0.2 + Math.sin(dateIndex) * 0.2 + Math.random() * 0.3, // Fluctuating
        mpv: 7 + Math.sin(dateIndex) * 1.5 + Math.random() * 1.5, // Fluctuating
        neutrophils: 45 + Math.sin(dateIndex) * 10 + Math.random() * 10, // Fluctuating
        potassium: 3.5 + Math.sin(dateIndex) * 0.5 + Math.random() * 0.5, // Fluctuating
        glucose_urine: Math.floor(Math.random() * 2) * 50 + Math.floor(Math.random() * 20), // Random positive or negative
        bacteria_urine_count: Math.floor(Math.random() * 1000) * (Math.random() > 0.7 ? 1 : 0), // Sometimes present, sometimes not
        hbe_positive: Math.random() > 0.9, // Rarely positive
        parasite_feces_positive: Math.random() > 0.85, // Occasionally positive
        ob: Math.random() > 0.8 ? 5 + Math.floor(Math.random() * 5) : 0, // Occasionally present
        created_at: new Date(Date.parse(createdTime) + 3600000).toISOString(), // 1 hour after first test
        updated_at: new Date(Date.parse(updatedTime) + 3600000).toISOString(),
      };

      tests.push(test1, test2, test3);
    });
  });

  return tests;
})();
