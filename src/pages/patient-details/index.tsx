import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Layout from '@/components/layout';
import { cn } from '@/utils/cn';
import {
  usePatientDiagnosticTests,
  DiagnosticTestDto,
  GridTest,
  latestTestsToGrid,
  analytes,
} from '@/features/diagnostic_tests';
import {
  DiagnosticTestsGrid,
  FullPatient,
  PatientInfoCard,
  ScoreTimelineChart,
  useGetPatientDetails,
  useGetPatients,
} from '@/features/patient';
import { TimeRange } from '@/types';
import { usePatientScores } from '@/features/score';
import { useDrugsByPatientId } from '@/features/drug';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

const getAnalyteHistory = (
  diagnosticData: { tests: DiagnosticTestDto[] } | undefined,
  analyteName: string,
) => {
  if (!diagnosticData?.tests?.length) return [];
  const relevant = diagnosticData.tests.filter(
    (t) =>
      t[analyteName as keyof typeof t] !== undefined &&
      t[analyteName as keyof typeof t] !== null,
  );
  const sorted = [...relevant].sort(
    (a, b) => +new Date(a.test_date) - +new Date(b.test_date),
  );
  return sorted.map((t) => ({
    date: t.test_date.split('T')[0],
    value: t[analyteName as keyof typeof t],
  }));
};

interface PatientScoreData {
  score_date: string;
  score: number;
  notes?: string;
}

const formatPatientScores = (
  patientScores: PatientScoreData[] | null | undefined,
) => {
  if (!patientScores?.length) return [];
  return [...patientScores]
    .sort((a, b) => +new Date(a.score_date) - +new Date(b.score_date))
    .map((s) => ({ week: s.score_date.split('T')[0], score: s.score }));
};

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

  const drugBars = useMemo(() => {
    if (!drugs?.length) return [];
    return drugs.map((d) => ({
      name: d.name,
      start: d.dateFrom.split('T')[0],
      end: d.dateTo ? d.dateTo.split('T')[0] : null,
    }));
  }, [drugs]);


  const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>('cea');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [colors, setColors] = useState({
    scoreColor: '#6b46c1',
    analyteColor: '#e53e3e',
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const patient = patients?.find((p) => p.id === patientDetail?.id);
  const fullPatient: FullPatient | undefined = useMemo(() => {
    if (!patient || !patientDetail) return undefined;
    return { ...patient, ...patientDetail };
  }, [patient, patientDetail]);

  const tests: GridTest[] = useMemo(
    () => latestTestsToGrid(diagnosticData),
    [diagnosticData],
  );

  const scoreHistory = useMemo(
    () => formatPatientScores(patientScores?.scores),
    [patientScores],
  );

  const analyteHistories = useMemo(() => {
    if (!diagnosticData?.tests?.length) return {};
    const result: Record<
      string,
      { name: string; dates: string[]; values: number[] }
    > = {};
    analytes.forEach((analyte) => {
      const history = getAnalyteHistory(diagnosticData, analyte);
      if (!history.length) return;
      result[analyte] = {
        name: analyte.toUpperCase(),
        dates: history.map((h) => h.date),
        values: history.map((h) => h.value as number),
      };
    });
    return result;
  }, [diagnosticData]);

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
          <div className="flex w-full flex-col rounded-sm pb-8">
            {scoresLoading ? (
              <div className="text-gray-500">Loading patient scores...</div>
            ) : !scoreHistory.length ? (
              <div className="text-gray-500">No score history available</div>
            ) : (
              <div className="flex h-full flex-col">
                <button
                  onClick={() => setIsGraphExpanded((v) => !v)}
                  className="bg-secondary-accent hover:bg-secondary/50 my-2 flex w-28 items-center justify-center rounded-sm text-2xl hover:cursor-pointer"
                >
                  {isGraphExpanded ? <FaAngleDown /> : <FaAngleUp />}
                </button>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <select
                    value={selectedAnalyte ?? ''}
                    onChange={(e) => setSelectedAnalyte(e.target.value || null)}
                    className="text-primary-accent rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                  >
                    <option value="">Score Only</option>
                    {Object.entries(analyteHistories).map(([k, d]) => (
                      <option key={k} value={k}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <div className="inline-flex overflow-hidden rounded-md">
                    {(['month', 'year', 'all'] as TimeRange[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-3 py-1 text-xs font-medium ${timeRange === r
                          ? 'bg-secondary-accent text-white'
                          : 'text-primary-accent bg-gray-200 hover:bg-gray-300'
                          } ${r === 'month'
                            ? 'rounded-l-md'
                            : r === 'all'
                              ? 'rounded-r-md'
                              : ''
                          }`}
                      >
                        {r === 'month'
                          ? 'Month'
                          : r === 'year'
                            ? 'Year'
                            : 'All'}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowColorPicker((v) => !v)}
                      className="flex items-center gap-1 rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300"
                    >
                      {selectedAnalyte
                        ? 'Customize colors'
                        : 'Customize score color'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8" />
                        {showColorPicker && <path d="M8 12h8" />}
                      </svg>
                    </button>
                    {showColorPicker && (
                      <div className="absolute z-10 mt-2 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                          Score Color
                        </label>
                        <input
                          type="color"
                          value={colors.scoreColor}
                          onChange={(e) =>
                            setColors({ ...colors, scoreColor: e.target.value })
                          }
                          className="mb-3 w-full"
                        />
                        {selectedAnalyte && (
                          <>
                            <label className="mb-1 block text-xs font-medium text-gray-700">
                              {analyteHistories[selectedAnalyte].name} Color
                            </label>
                            <input
                              type="color"
                              value={colors.analyteColor}
                              onChange={(e) =>
                                setColors({
                                  ...colors,
                                  analyteColor: e.target.value,
                                })
                              }
                              className="mb-3 w-full"
                            />
                          </>
                        )}
                        <button
                          onClick={() =>
                            setColors({
                              scoreColor: '#6b46c1',
                              analyteColor: '#e53e3e',
                            })
                          }
                          className="w-full rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                        >
                          Reset defaults
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <ScoreTimelineChart
                    weeks={scoreHistory.map((p) => p.week)}
                    scores={scoreHistory.map((p) => p.score)}
                    analyteData={
                      selectedAnalyte ? analyteHistories[selectedAnalyte] : undefined
                    }
                    timeRange={timeRange}
                    colors={colors}
                    drugBars={drugBars}
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
