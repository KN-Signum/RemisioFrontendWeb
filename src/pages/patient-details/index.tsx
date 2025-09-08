import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout/main';
import { cn } from '@/utils/common';
import {
  usePatientDiagnosticTests,
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
import { Loading } from '@/components/ui/loading';
import { useTranslation } from 'react-i18next';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

const PatientDetailsPage = () => {
  const { t } = useTranslation('patients');
  const { id } = useParams<{ id: string }>();
  const [isGraphExpanded, setIsGraphExpanded] = useState(false);
  const {
    data: diagnosticTests,
    isLoading: testsLoading,
    error: testsError,
  } = usePatientDiagnosticTests(id ?? '');
  const {
    data: patientScores,
    isLoading: scoresLoading,
    error: scoresError,
  } = usePatientScores(id ?? '');
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

  if (patientsLoading || patientLoading)
    return (
      <Layout>
        <Loading size={150} />
      </Layout>
    );

  if (!patient)
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-red-500">
          {t('patientNotFound')}
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

          <DiagnosticTestsGrid
            diagnosticTests={diagnosticTests}
            loading={testsLoading}
            error={testsError}
          />
        </div>
        <div
          className={cn(
            borderClasses,
            'px-1.5',
            isGraphExpanded ? '-mt-2.5 h-[88.5vh]' : 'h-[52vh]',
          )}
        >
          {testsLoading || scoresLoading ? (
            <Loading />
          ) : testsError || scoresError ? (
            <div className="flex w-full items-center justify-center font-bold text-red-500">
              {t('failedToLoadTests')}
            </div>
          ) : diagnosticTests.length == 0 ? (
            <div className="flex w-full items-center justify-center font-bold text-red-500">
              {t('noTestsFound')}
            </div>
          ) : (
            <Graph
              patientScores={patientScores}
              scoresLoading={scoresLoading}
              drugs={drugs}
              diagnosticData={diagnosticTests}
              isGraphExpanded={isGraphExpanded}
              resizeGraph={() => {
                setIsGraphExpanded((v) => !v);
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailsPage;
