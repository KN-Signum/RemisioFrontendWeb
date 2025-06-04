import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { mockPatients } from './patients';
import { v4 as uuidv4 } from 'uuid';

export const mockDiagnosticTests: DiagnosticTestDto[] = (() => {
    const tests: DiagnosticTestDto[] = [];

    // Create sample diagnostic tests for each patient
    mockPatients.forEach((patient) => {
        // Create two test dates for each patient
        ['2025-05-05T07:30:00Z', '2025-05-15T07:30:00Z'].forEach((testDate) => {
            // First partial test with just ldl
            const test1: DiagnosticTestDto = {
                id: uuidv4(),
                patient_id: patient.id,
                test_date: testDate,
                ldl: 120 + Math.floor(Math.random() * 30),
                created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                updated_at: new Date(Date.now() - 3600000).toISOString()
            };

            // Second partial test with hemoglobin and hct
            const test2: DiagnosticTestDto = {
                id: uuidv4(),
                patient_id: patient.id,
                test_date: testDate,
                hemoglobin: 14 + Math.random() * 2,
                hct: 40 + Math.floor(Math.random() * 5),
                created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
                updated_at: new Date(Date.now() - 1800000).toISOString()
            };

            // Third partial test with cea
            const test3: DiagnosticTestDto = {
                id: uuidv4(),
                patient_id: patient.id,
                test_date: testDate,
                cea: 2.5 + Math.random() * 1.5,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            tests.push(test1, test2, test3);
        });
    });

    return tests;
})();