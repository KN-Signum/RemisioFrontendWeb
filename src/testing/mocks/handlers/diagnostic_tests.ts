import { http, HttpResponse } from 'msw';
import { API_URL } from '@/config/constants';
import { db } from '..';
import { DiagnosticTestJSON } from '../setup/types';

// GET endpoint to retrieve patient diagnostic tests
export const getPatientDiagnosticTests = http.get<{ patientId: string }>(
  `${API_URL}/patients/:patientId/diagnostic-tests`,
  ({ params }) => {
    console.log('[MSW] Get patient diagnostic tests', params);
    const { patientId } = params as { patientId: string };
    // Get all diagnostic tests for the patient
    const tests = db.diagnosticTest
      .getAll()
      .filter((test) => test.patient_id === patientId);

    // Group tests by test_date
    const testsByDate = new Map<string, DiagnosticTestJSON[]>();
    tests.forEach((test) => {
      if (!testsByDate.has(test.test_date)) {
        testsByDate.set(test.test_date, []);
      }
      testsByDate.get(test.test_date)!.push(test);
    });

    // Merge tests with the same test_date
    const mergedTests: DiagnosticTestJSON[] = [];

    testsByDate.forEach((testsForDate, date) => {
      // Sort tests by updated_at to get the latest values
      testsForDate.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

      // Create a merged test with the latest non-null values
      const mergedTest: DiagnosticTestJSON = {
        id: testsForDate[0].id,
        patient_id: patientId,
        test_date: date,
        test_notes: testsForDate[0].test_notes,
        created_at: testsForDate[testsForDate.length - 1].created_at,
        updated_at: testsForDate[0].updated_at,
      };

      // Get the column names from the first test (excluding metadata fields)
      const columnNames = Object.keys(testsForDate[0]).filter(
        (key) =>
          ![
            'id',
            'patient_id',
            'test_date',
            'created_at',
            'updated_at',
          ].includes(key),
      );

      // For each column, find the latest non-null value
      columnNames.forEach((column) => {
        for (const test of testsForDate) {
          const typedColumn = column as keyof DiagnosticTestJSON;
          if (test[typedColumn] !== null && test[typedColumn] !== undefined) {
            // TODO: Handle type assertion more gracefully
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (mergedTest as any)[column] = test[typedColumn];
            break;
          }
        }
      });

      mergedTests.push(mergedTest);
    });

    return HttpResponse.json(mergedTests);
  },
);

export const handlers = [getPatientDiagnosticTests];
