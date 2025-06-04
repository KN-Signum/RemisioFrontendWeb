import { useParams } from 'react-router-dom';
import { mockPatients } from '@/testing/mocks/setup/test-data/patients';
import Layout from '@/components/layout';
import { PatientInfoCard } from '@/features/patient/components/details/patient-info-card';
import { DiagnosticTestsGrid } from '@/features/patient/components/details/diagnostic-test-grid';
import { ScoreTimelineChart } from '@/features/patient/components/details/score-time-line-chart';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import { usePatientDiagnosticTests } from '@/features/diagnostic_tests/api/get-patient-diagnostic-tests';
import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { usePatientScores } from '@/features/score/api/get-patient-scores';

const borderClasses = 'flex w-full border-2 border-white/50 rounded-sm py-2';

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

    // Process diagnostic tests data - always call useMemo unconditionally
    const tests = useMemo(() => {
        return processTestData(diagnosticData);
    }, [diagnosticData]);

    // Format patient scores for the chart - always call useMemo unconditionally
    const scoreHistory = useMemo(() => {
        return formatPatientScores(patientScores);
    }, [patientScores]);

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
                        <h2 className="text-primary mb-4 text-lg font-bold">
                            Historia wyników pacjenta
                        </h2>
                        {scoresError ? (
                            <div className="text-red-500">Failed to load patient scores</div>
                        ) : scoresLoading ? (
                            <div className="text-gray-500">Loading patient scores...</div>
                        ) : scoreHistory.length === 0 ? (
                            <div className="text-gray-500">No score history available</div>
                        ) : (
                            <ScoreTimelineChart
                                weeks={scoreHistory.map((p) => p.week)}
                                scores={scoreHistory.map((p) => p.score)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientDetailsPage;