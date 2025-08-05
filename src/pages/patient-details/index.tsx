import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout';
import { cn } from '@/utils/cn';
import {
  usePatientDiagnosticTests,
  GridTest,
  latestTestsToGrid,
  DiagnosticTestsGrid,
} from '@/features/diagnostic_tests';
import {
  FullPatient,
  Graph,
  PatientInfoCard,
  useGetPatientDetails,
  useGetPatients,
} from '@/features/patients';
import { usePatientScores } from '@/features/scores';
import { useDrugsByPatientId } from '@/features/drugs';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isGraphExpanded, setIsGraphExpanded] = useState(false);
  const {
    data: diagnosticData,
    isLoading: testsLoading,
    error: testsError,
  } = usePatientDiagnosticTests(id ?? '');
  const { data: patientScores, isLoading: scoresLoading } = usePatientScores(
    id ?? '',
  );
  const { data: patientDetail, isLoading: patientLoading } =
    useGetPatientDetails(id ?? '');
  const { data: patients, isLoading: patientsLoading } = useGetPatients();
  const { data: drugs, isLoading: drugsLoading } = useDrugsByPatientId(
    id ?? '',
  );

  const patient = patients?.find((p) => p.id === patientDetail?.id);
  const fullPatient: FullPatient | undefined = useMemo(() => {
    if (!patient || !patientDetail) return undefined;
    return { ...patient, ...patientDetail };
  }, [patient, patientDetail]);

  const tests: GridTest[] = useMemo(
    () => latestTestsToGrid(diagnosticData),
    [diagnosticData],
  );

  if (patientsLoading || patientLoading)
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-gray-500">
          Loading patient details...
        </div>
      </Layout>
    );

  if (!patient)
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-red-500">
          Patient not found.
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex w-full flex-col gap-2.5 overflow-y-visible">
        <div
          className={cn(
            borderClasses,
            'gap-3 px-1.5',
            'overflow-hidden transition-all duration-900 ease-in-out',
            isGraphExpanded ? 'h-[0vh] border-0 py-0' : 'h-[35vh]',
          )}
        >
          <PatientInfoCard
            id={fullPatient!.id}
            disease_type={fullPatient!.disease_type}
            name={fullPatient!.first_name + ' ' + fullPatient!.last_name}
            phone_number={fullPatient!.phone_number}
            age={fullPatient!.age}
            hospital={fullPatient!.hospital}
            weight={fullPatient!.weight}
            drugs={drugs}
            drugsLoading={drugsLoading}
          />
          {testsError ? (
            <div className="text-red-500">Failed to load tests</div>
          ) : (
            <DiagnosticTestsGrid tests={tests} loading={testsLoading} />
          )}
        </div>
        {/*TODO: breake it into seperate components */}
        <div
          className={cn(
            borderClasses,
            'px-1.5',
            isGraphExpanded ? '-mt-2.5 h-[88.5vh]' : 'h-[52vh]',
          )}
        >
          <Graph
            patientScores={patientScores}
            scoresLoading={scoresLoading}
            drugs={drugs}
            diagnosticData={diagnosticData}
            isGraphExpanded={isGraphExpanded}
            resizeGraph={() => {
              setIsGraphExpanded((v) => !v);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
