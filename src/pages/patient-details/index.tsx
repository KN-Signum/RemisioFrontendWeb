import { useParams } from 'react-router-dom';
import { mockPatients } from '@/testing/mocks/setup/test-data/patients';
import Layout from '@/components/layout';
import { PatientInfoCard } from '@/features/patient/components/details/patient-info-card';
import { DiagnosticTestsGrid } from '@/features/patient/components/details/diagnostic-test-grid';
import { ScoreTimelineChart } from '@/features/patient/components/details/score-time-line-chart';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const borderClasses = 'flex w-full border-2 border-white/50 rounded-sm py-2';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const patient = mockPatients.find((p) => p.id === parseInt(id || '', 10));

  if (!patient)
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-red-500">
          Patient not found.
        </div>
      </Layout>
    );

  /* --- mock score --- */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scoreHistory = useMemo(() => {
    return Array.from({ length: 8 }).map((_, w) => {
      const d = new Date();
      d.setDate(d.getDate() + w * 7);
      return {
        week: d.toISOString().split('T')[0],
        score: Math.max(
          0,
          Math.min(100, patient.score + (Math.random() * 10 - 5)),
        ),
      };
    });
  }, [patient.score]);

  /* --- mock tests --- */
  const tests = Array.from({ length: 12 }).map((_, i) => ({
    name: `Test ${i + 1}`,
    value: `${(Math.random() * 100).toFixed(1)} mg/dL`,
  }));

  return (
    <Layout>
      <div
        className="flex w-full flex-col gap-1 overflow-y-visible"
        style={{ height: '100vh' }}
      >
        {/* top */}
        <div className={cn(borderClasses, 'h-[40vh] gap-3 px-1.5')}>
          <PatientInfoCard patient={patient} />
          <DiagnosticTestsGrid tests={tests} />
        </div>

        {/* bottom */}
        <div className={cn(borderClasses, 'h-[50.5vh] px-1.5')}>
          <div className="flex w-full flex-col rounded-sm bg-white p-8 shadow-md">
            <h2 className="text-primary mb-4 text-lg font-bold">
              Zmiana score w ostatnich 8 tygodniach
            </h2>
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
