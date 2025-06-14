import { useParams } from 'react-router-dom';
import Layout from '@/components/layout';
import { PatientInfoCard } from '@/features/patient/components/details/patient-info-card';
import { DiagnosticTestsGrid } from '@/features/patient/components/details/diagnostic-test-grid';
import { ScoreTimelineChart } from '@/features/patient/components/details/score-time-line-chart';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import { usePatientDiagnosticTests } from '@/features/diagnostic_tests/api/get-patient-diagnostic-tests';
import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import {
  FullPatient,
  useGetPatientDetails,
  useGetPatients,
} from '@/features/patient';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

// Helper function to process diagnostic tests data
const processTestData = (
  diagnosticData: { tests: DiagnosticTestDto[] } | undefined,
) => {
  if (!diagnosticData?.tests?.length) {
    return [];
  }

  // Get the most recent test
  const latestTest = [...diagnosticData.tests].sort(
    (a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime(),
  )[0];

  // Convert test properties to name-value pairs for display
  return Object.entries(latestTest)
    .filter(([key, value]) => {
      // Filter out metadata fields and null/undefined values
      return (
        ![
          'id',
          'patient_id',
          'test_date',
          'created_at',
          'updated_at',
          'test_notes',
        ].includes(key) &&
        value !== null &&
        value !== undefined
      );
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

// Helper function to generate score history
const generateScoreHistory = (score: number = 50) => {
  return Array.from({ length: 8 }).map((_, w) => {
    const d = new Date();
    d.setDate(d.getDate() + w * 7);
    return {
      week: d.toISOString().split('T')[0],
      score: Math.max(0, Math.min(100, score + (Math.random() * 10 - 5))),
    };
  });
};

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: diagnosticData,
    isLoading: testsLoading,
    error: testsError,
  } = usePatientDiagnosticTests(id ?? '');
  const { data: patientDetail, isLoading: patientLoading } =
    useGetPatientDetails(id ?? '');
  const { data: patients, isLoading: patientsLoading } = useGetPatients();

  // merge patientDetail with patient[id] into FullPatientDto
  const patient = patients?.find((p) => p.id === patientDetail?.id);
  const fullPatient: FullPatient | undefined = useMemo(() => {
    if (!patient || !patientDetail) return undefined;

    return {
      ...patient,
      ...patientDetail,
    };
  }, [patient, patientDetail]);

  // Process diagnostic tests data - always call useMemo unconditionally
  const tests = useMemo(() => {
    return processTestData(diagnosticData);
  }, [diagnosticData]);

  // Generate score history - always call useMemo unconditionally
  const scoreHistory = useMemo(() => {
    return generateScoreHistory(fullPatient?.score);
  }, [fullPatient?.score]);

  if (patientsLoading || patientLoading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-gray-500">
          Loading patient details...
        </div>
      </Layout>
    );
  }

  if (!fullPatient) {
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
          <PatientInfoCard
            name={fullPatient.full_name}
            phone_number={fullPatient.phone}
            age={fullPatient.age}
            hospital={fullPatient.hospital}
            weight={fullPatient.weight}
          />
          {testsError ? (
            <div className="text-red-500">Failed to load tests</div>
          ) : (
            <DiagnosticTestsGrid tests={tests} loading={testsLoading} />
          )}
        </div>

        {/* bottom */}
        <div className={cn(borderClasses, 'h-[50.5vh] px-1.5')}>
          <div className="flex w-full flex-col rounded-sm p-8 shadow-md">
            <span className="text-primary mb-4 text-lg font-bold">
              Zmiana score w ostatnich 8 tygodniach
            </span>
            <ScoreTimelineChart
              weeks={scoreHistory.map((p) => p.week)}
              scores={scoreHistory.map((p) => p.score)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
