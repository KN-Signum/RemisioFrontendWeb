import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { CreateDiagnosticTestDto, DiagnosticTestDto } from '@/features/diagnostic_tests';
import { v4 as uuidv4 } from 'uuid';



// POST endpoint to create a diagnostic test
export const createDiagnosticTest = http.post(
    `${API_URL}/api/diagnostic_tests`,
    async ({ request }) => {
        const data = await request.json() as CreateDiagnosticTestDto;
        console.log('[MSW] Create diagnostic test', data);

        // Generate a new UUID for the test
        const id = uuidv4();
        const now = new Date().toISOString();

        // Store the test in the database
        db.diagnosticTest.create({
            id,
            ...data,
            created_at: now,
            updated_at: now
        });

        return HttpResponse.json({
            status: 201,
            content: { id }
        });
    }
);

// GET endpoint to retrieve patient diagnostic tests
export const getPatientDiagnosticTests = http.get(
    `${API_URL}/api/diagnostic_tests/:patientId`,
    ({ params, request }) => {
        console.log('[MSW] Get patient diagnostic tests', params);
        const { patientId } = params as { patientId: string };

        // Get the test_date query parameter if it exists
        const url = new URL(request.url);
        const testDate = url.searchParams.get('test_date');

        // Get all diagnostic tests for the patient
        let tests = db.diagnosticTest
            .getAll()
            .filter((test) => test.patient_id === patientId);

        // Filter by test_date if provided
        if (testDate) {
            tests = tests.filter((test) => test.test_date === testDate);
        }

        // Group tests by test_date
        const testsByDate = new Map<string, DiagnosticTestDto[]>();
        tests.forEach(test => {
            if (!testsByDate.has(test.test_date)) {
                testsByDate.set(test.test_date, []);
            }
            testsByDate.get(test.test_date)!.push(test);
        });

        // Merge tests with the same test_date
        const mergedTests: DiagnosticTestDto[] = [];

        testsByDate.forEach((testsForDate, date) => {
            // Sort tests by updated_at to get the latest values
            testsForDate.sort((a, b) =>
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );

            // Create a merged test with the latest non-null values
            const mergedTest: DiagnosticTestDto = {
                id: testsForDate[0].id,
                patient_id: patientId,
                test_date: date,
                created_at: testsForDate[testsForDate.length - 1].created_at,
                updated_at: testsForDate[0].updated_at
            };

            // Get the column names from the first test (excluding metadata fields)
            const columnNames = Object.keys(testsForDate[0]).filter(key =>
                !['id', 'patient_id', 'test_date', 'created_at', 'updated_at'].includes(key)
            );

            // For each column, find the latest non-null value
            columnNames.forEach(column => {
                for (const test of testsForDate) {
                    const typedColumn = column as keyof DiagnosticTestDto;
                    if (test[typedColumn] !== null &&
                        test[typedColumn] !== undefined) {
                        (mergedTest as any)[column] = test[typedColumn];
                        break;
                    }
                }
            });

            mergedTests.push(mergedTest as DiagnosticTestDto);
        });

        return HttpResponse.json({
            status: 200,
            content: {
                patient_id: patientId,
                tests: mergedTests
            }
        });
    }
);

export const handlers = [
    createDiagnosticTest,
    getPatientDiagnosticTests
];
