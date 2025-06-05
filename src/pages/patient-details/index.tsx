import { useParams } from 'react-router-dom';
import { mockPatients } from '@/testing/mocks/setup/test-data/patients';
import Layout from '@/components/layout';
import { PatientInfoCard } from '@/features/patient/components/details/patient-info-card';
import { DiagnosticTestsGrid } from '@/features/patient/components/details/diagnostic-test-grid';
import { ScoreTimelineChart } from '@/features/patient/components/details/score-time-line-chart';
import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import { usePatientDiagnosticTests } from '@/features/diagnostic_tests/api/get-patient-diagnostic-tests';
import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { usePatientScores } from '@/features/score/api/get-patient-scores';

const borderClasses = 'flex w-full border-2 border-white/50 rounded-sm py-2';

// Function to get historical values for a specific analyte
const getAnalyteHistory = (diagnosticData: { tests: DiagnosticTestDto[] } | undefined, analyteName: string) => {
    if (!diagnosticData?.tests?.length) {
        return [];
    }

    // Filter tests that have the specified analyte
    const relevantTests = diagnosticData.tests.filter(test =>
        test[analyteName as keyof typeof test] !== undefined &&
        test[analyteName as keyof typeof test] !== null
    );

    // Sort by date (oldest first)
    const sortedTests = [...relevantTests].sort((a, b) =>
        new Date(a.test_date).getTime() - new Date(b.test_date).getTime()
    );

    // Extract date and value for the specified analyte
    const history = sortedTests.map(test => ({
        date: test.test_date.split('T')[0], // Format date as YYYY-MM-DD
        value: test[analyteName as keyof typeof test]
    }));

    // Example usage - print to console
    console.log(`History for ${analyteName}:`, history);

    return history;
};

// Helper function to process diagnostic tests data
const processTestData = (diagnosticData: { tests: DiagnosticTestDto[] } | undefined) => {
    if (!diagnosticData?.tests?.length) {
        return [];
    }

    // Get the most recent test
    const latestTest = [...diagnosticData.tests].sort((a, b) =>
        new Date(b.test_date).getTime() - new Date(a.test_date).getTime()
    )[0];

    // Convert test properties to name-value pairs for display
    return Object.entries(latestTest)
        .filter(([key, value]) => {
            // Filter out metadata fields and null/undefined values
            return !['id', 'patient_id', 'test_date', 'created_at', 'updated_at', 'test_notes'].includes(key)
                && value !== null
                && value !== undefined;
        })
        .map(([key, value]) => {
            // Format the value based on its type
            let formattedValue = '';
            if (typeof value === 'boolean') {
                formattedValue = value ? 'Positive' : 'Negative';
            } else if (typeof value === 'number') {
                // Add appropriate units based on the test type
                if (key === 'cea') formattedValue = `${value} ng/mL`;
                else if (key === 'ldl') formattedValue = `${value} mg/dL`;
                else if (key === 'calprotectin_feces') formattedValue = `${value} µg/g`;
                else if (key === 'hemoglobin') formattedValue = `${value} g/dL`;
                else if (key === 'hct') formattedValue = `${value} %`;
                else if (key === 'leukocytes') formattedValue = `${value} 10^3/µL`;
                else formattedValue = value.toString();
            } else {
                formattedValue = value.toString();
            }

            return {
                name: key.replace(/_/g, ' ').toUpperCase(),
                value: formattedValue,
            };
        });
};

// Helper function to format patient scores for the chart
const formatPatientScores = (patientScores: any) => {
    if (!patientScores?.scores?.length) {
        return [];
    }

    // Sort scores by date (oldest first for the chart)
    return [...patientScores.scores]
        .sort((a, b) => new Date(a.score_date).getTime() - new Date(b.score_date).getTime())
        .map(score => ({
            week: score.score_date.split('T')[0],
            score: score.score, // Convert 0-10 scale to 0-100 for the chart
        }));
};

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: diagnosticData,
        isLoading: testsLoading,
        error: testsError,
    } = usePatientDiagnosticTests(id ?? '');
    const {
        data: patientScores,
        isLoading: scoresLoading,
        error: scoresError,
    } = usePatientScores(id ?? '');
    const patient = mockPatients.find((p) => p.id === id);

    // State to track the selected analyte (null means no analyte selected)
    const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>('cea');

    // Process diagnostic tests data - always call useMemo unconditionally
    const tests = useMemo(() => {
        return processTestData(diagnosticData);
    }, [diagnosticData]);

    // Format patient scores for the chart - always call useMemo unconditionally
    const scoreHistory = useMemo(() => {
        return formatPatientScores(patientScores);
    }, [patientScores]);

    // Get historical values for multiple analytes
    const analyteHistories = useMemo(() => {
        if (!diagnosticData?.tests?.length) {
            return {};
        }

        // Define the analytes we want to track
        const analytesToTrack = ['cea', 'hemoglobin', 'calprotectin_feces', 'ldl', 'hct', 'leukocytes'];
        const result: Record<string, { name: string, dates: string[], values: number[] }> = {};

        // Get history for each analyte
        analytesToTrack.forEach(analyteName => {
            const history = getAnalyteHistory(diagnosticData, analyteName);

            if (history.length > 0) {
                // Format display names
                let displayName = analyteName.toUpperCase().replace(/_/g, ' ');

                // Add units to display names
                if (analyteName === 'cea') displayName = 'CEA (ng/mL)';
                else if (analyteName === 'ldl') displayName = 'LDL (mg/dL)';
                else if (analyteName === 'calprotectin_feces') displayName = 'CALPROTECTIN (µg/g)';
                else if (analyteName === 'hemoglobin') displayName = 'HEMOGLOBIN (g/dL)';
                else if (analyteName === 'hct') displayName = 'HCT (%)';
                else if (analyteName === 'leukocytes') displayName = 'LEUKOCYTES (10^3/µL)';

                result[analyteName] = {
                    name: displayName,
                    dates: history.map(item => item.date),
                    values: history.map(item => item.value as number)
                };

                console.log(`${displayName} History:`, history);
            }
        });

        return result;
    }, [diagnosticData]);

    if (!patient) {
        return (
            <Layout>
                <div className="flex h-full items-center justify-center text-red-500">
                    Patient not found.
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div
                className="flex w-full flex-col gap-1 overflow-y-visible"
                style={{ height: '100vh' }}
            >
                {/* top */}
                <div className={cn(borderClasses, 'h-[40vh] gap-3 px-1.5')}>
                    <PatientInfoCard patient={patient} />

                    {testsError ? (
                        <div className="text-red-500">Failed to load tests</div>
                    ) : (
                        <DiagnosticTestsGrid tests={tests} loading={testsLoading} />
                    )}
                </div>

                {/* bottom */}
                <div className={cn(borderClasses, 'h-[50.5vh] px-1.5')}>
                    <div className="flex w-full flex-col rounded-sm bg-white p-8 shadow-md">
                        {scoresError ? (
                            <div className="text-red-500">Failed to load patient scores</div>
                        ) : scoresLoading ? (
                            <div className="text-gray-500">Loading patient scores...</div>
                        ) : scoreHistory.length === 0 ? (
                            <div className="text-gray-500">No score history available</div>
                        ) : (
                            <div className="h-full flex flex-col">
                                {/* Analyte selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Analyte to Display:
                                    </label>
                                    <select
                                        value={selectedAnalyte || ''}
                                        onChange={(e) => setSelectedAnalyte(e.target.value || null)}
                                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Score Only (No Analyte)</option>
                                        {Object.entries(analyteHistories).map(([key, data]) => (
                                            <option key={key} value={key}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Chart */}
                                <div className="flex-grow">
                                    <ScoreTimelineChart
                                        weeks={scoreHistory.map((p) => p.week)}
                                        scores={scoreHistory.map((p) => p.score)}
                                        analyteData={selectedAnalyte ? analyteHistories[selectedAnalyte] : undefined}
                                    // You can provide default colors here if needed
                                    // colors={{ scoreColor: '#4299e1', analyteColor: '#f56565' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientDetailsPage;