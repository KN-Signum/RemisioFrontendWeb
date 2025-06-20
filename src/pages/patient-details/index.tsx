import { useParams } from 'react-router-dom';
import Layout from '@/components/layout';
import { PatientInfoCard } from '@/features/patient/components/details/patient-info-card';
import { DiagnosticTestsGrid } from '@/features/patient/components/details/diagnostic-test-grid';
import { ScoreTimelineChart, TimeRange } from '@/features/patient/components/details/score-time-line-chart';
import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import { usePatientDiagnosticTests } from '@/features/diagnostic_tests/api/get-patient-diagnostic-tests';
import { DiagnosticTestDto } from '@/features/diagnostic_tests';
import { FullPatient, useGetPatientDetails, useGetPatients } from '@/features/patient';

import { usePatientScores } from '@/features/score/api/get-patient-scores';
import { useDrugsByPatientId } from '@/features/drug/api/get-all-patient-drugs';
import { useSymptomsByPatientId } from '@/features/symptoms/api/get-patient-symptoms';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

const getAnalyteHistory = (
  diagnosticData: { tests: DiagnosticTestDto[] } | undefined,
  analyteName: string,
) => {
  if (!diagnosticData?.tests?.length) return [];
  const relevant = diagnosticData.tests.filter(
    t => t[analyteName as keyof typeof t] !== undefined && t[analyteName as keyof typeof t] !== null,
  );
  const sorted = [...relevant].sort(
    (a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime(),
  );
  return sorted.map(t => ({
    date: t.test_date.split('T')[0],
    value: t[analyteName as keyof typeof t],
  }));
};

const processTestData = (
  diagnosticData: { tests: DiagnosticTestDto[] } | undefined,
) => {
  if (!diagnosticData?.tests?.length) return [];
  const latest = [...diagnosticData.tests].sort(
    (a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime(),
  )[0];
  return Object.entries(latest)
    .filter(
      ([k, v]) =>
        !['id', 'patient_id', 'test_date', 'created_at', 'updated_at', 'test_notes'].includes(k) &&
        v !== null &&
        v !== undefined,
    )
    .map(([k, v]) => {
      let val = '';
      if (typeof v === 'boolean') val = v ? 'Positive' : 'Negative';
      else if (typeof v === 'number') {
        if (k === 'cea') val = `${v} ng/mL`;
        else if (k === 'ldl') val = `${v} mg/dL`;
        else if (k === 'calprotectin_feces') val = `${v} µg/g`;
        else if (k === 'hemoglobin') val = `${v} g/dL`;
        else if (k === 'hct' || k === 'basophils' || k === 'neutrophils') val = `${v} %`;
        else if (k === 'leukocytes' || k === 'monocytes') val = `${v} 10^3/µL`;
        else if (k === 'erythrocytes') val = `${v} 10^6/µL`;
        else if (k === 'erythroblasts') val = `${v} NRBC/100 WBC`;
        else if (k === 'ast' || k === 'alkaline_phosphatase') val = `${v} U/L`;
        else if (k === 'bilirubin') val = `${v} mg/dL`;
        else if (k === 'mch') val = `${v} pg`;
        else if (k === 'mchc') val = `${v} g/dL`;
        else if (k === 'mpv') val = `${v} fL`;
        else if (k === 'potassium') val = `${v} mmol/L`;
        else val = v.toString();
      } else {
        val = v.toString();
      }
      return { name: k.replace(/_/g, ' ').toUpperCase(), value: val };
    });
};

interface PatientScoreData {
  score_date: string;
  score: number;
  notes?: string;
}

interface PatientScoreResponse {
  scores: PatientScoreData[];
}

const formatPatientScores = (
  patientScores: PatientScoreResponse | null | undefined,
) => {
  if (!patientScores?.scores?.length) return [];
  return [...patientScores.scores]
    .sort(
      (a, b) => new Date(a.score_date).getTime() - new Date(b.score_date).getTime(),
    )
    .map(s => ({ week: s.score_date.split('T')[0], score: s.score }));
};

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: diagnosticData, isLoading: testsLoading, error: testsError } =
    usePatientDiagnosticTests(id ?? '');
  const { data: patientScores, isLoading: scoresLoading, error: scoresError } =
    usePatientScores(id ?? '');
  const { data: patientDetail, isLoading: patientLoading } =
    useGetPatientDetails(id ?? '');
  const { data: patients, isLoading: patientsLoading } = useGetPatients();

  const { data: drugs, isLoading: drugsLoading } = useDrugsByPatientId(id ?? '');
  const {
    data: symptoms,
    isLoading: symptomsLoading,
  } = useSymptomsByPatientId(id ?? '');


  const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>('cea');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [colors, setColors] = useState({
    scoreColor: '#6b46c1',
    analyteColor: '#e53e3e',
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const patient = patients?.find(p => p.id === patientDetail?.id);
  const fullPatient: FullPatient | undefined = useMemo(() => {
    if (!patient || !patientDetail) return undefined;
    return { ...patient, ...patientDetail };
  }, [patient, patientDetail]);

  const tests = useMemo(() => processTestData(diagnosticData), [diagnosticData]);
  const scoreHistory = useMemo(
    () => formatPatientScores(patientScores),
    [patientScores],
  );

  const analyteHistories = useMemo(() => {
    if (!diagnosticData?.tests?.length) return {};
    const analytes = [
      'cea',
      'hemoglobin',
      'calprotectin_feces',
      'ldl',
      'hct',
      'leukocytes',
      'ast',
      'bilirubin',
      'alkaline_phosphatase',
      'basophils',
      'erythroblasts',
      'erythrocytes',
      'mch',
      'mchc',
      'monocytes',
      'mpv',
      'neutrophils',
      'potassium',
    ];
    const result: Record<
      string,
      { name: string; dates: string[]; values: number[] }
    > = {};
    analytes.forEach(name => {
      const history = getAnalyteHistory(diagnosticData, name);
      if (history.length === 0) return;
      let display = name.toUpperCase().replace(/_/g, ' ');
      if (name === 'cea') display = 'CEA (ng/mL)';
      else if (name === 'ldl') display = 'LDL (mg/dL)';
      else if (name === 'calprotectin_feces') display = 'CALPROTECTIN (µg/g)';
      else if (name === 'hemoglobin') display = 'HEMOGLOBIN (g/dL)';
      else if (name === 'hct') display = 'HCT (%)';
      else if (name === 'leukocytes') display = 'LEUKOCYTES (10^3/µL)';
      else if (name === 'ast') display = 'AST (U/L)';
      else if (name === 'bilirubin') display = 'BILIRUBIN (mg/dL)';
      else if (name === 'alkaline_phosphatase') display = 'ALKALINE PHOSPHATASE (U/L)';
      else if (name === 'basophils') display = 'BASOPHILS (%)';
      else if (name === 'erythroblasts') display = 'ERYTHROBLASTS (NRBC/100 WBC)';
      else if (name === 'erythrocytes') display = 'ERYTHROCYTES (10^6/µL)';
      else if (name === 'mch') display = 'MCH (pg)';
      else if (name === 'mchc') display = 'MCHC (g/dL)';
      else if (name === 'monocytes') display = 'MONOCYTES (10^3/µL)';
      else if (name === 'mpv') display = 'MPV (fL)';
      else if (name === 'neutrophils') display = 'NEUTROPHILS (%)';
      else if (name === 'potassium') display = 'POTASSIUM (mmol/L)';
      result[name] = {
        name: display,
        dates: history.map(h => h.date),
        values: history.map(h => h.value as number),
      };
    });
    return result;
  }, [diagnosticData]);

  if (patientsLoading || patientLoading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center text-gray-500">
          Loading patient details...
        </div>
      </Layout>
    );
  }

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
        <div className={cn(borderClasses, 'h-[40vh] gap-3 px-1.5')}>
          <PatientInfoCard
            id={fullPatient!.id}
            disease_type={fullPatient!.disease}
            name={fullPatient!.full_name}
            phone_number={fullPatient!.phone}
            age={fullPatient!.age}
            hospital={fullPatient!.hospital}
            weight={fullPatient!.weight}
            drugs={drugs}
            drugsLoading={drugsLoading}
            symptoms={symptoms}
            symptomsLoading={symptomsLoading}
          />
          {testsError ? (
            <div className="text-red-500">Failed to load tests</div>
          ) : (
            <DiagnosticTestsGrid tests={tests} loading={testsLoading} />
          )}
        </div>
        <div className={cn(borderClasses, 'h-[50.5vh] px-1.5')}>
          <div className="flex w-full flex-col rounded-sm bg-white p-8 shadow-md">
            {scoresError ? (
              <div className="text-red-500">Failed to load patient scores</div>
            ) : scoresLoading ? (
              <div className="text-gray-500">Loading patient scores...</div>
            ) : scoreHistory.length === 0 ? (
              <div className="text-gray-500">No score history available</div>
            ) : (
              <div className="flex h-full flex-col">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <select
                    value={selectedAnalyte ?? ''}
                    onChange={e => setSelectedAnalyte(e.target.value || null)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-primary-accent"
                  >
                    <option value="">Score Only</option>
                    {Object.entries(analyteHistories).map(([k, d]) => (
                      <option key={k} value={k}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <div className="inline-flex overflow-hidden rounded-md">
                    {(['month', 'year', 'all'] as TimeRange[]).map(r => (
                      <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-3 py-1 text-xs font-medium ${timeRange === r
                          ? 'bg-secondary-accent text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-primary-accent'
                          } ${r === 'month'
                            ? 'rounded-l-md'
                            : r === 'all'
                              ? 'rounded-r-md'
                              : ''
                          }`}
                      >
                        {r === 'month' ? 'Month' : r === 'year' ? 'Year' : 'All'}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowColorPicker(v => !v)}
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 8v8"></path>
                        {showColorPicker ? <path d="M8 12h8"></path> : null}
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
                          onChange={e =>
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
                              onChange={e =>
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
                    weeks={scoreHistory.map(p => p.week)}
                    scores={scoreHistory.map(p => p.score)}
                    analyteData={
                      selectedAnalyte ? analyteHistories[selectedAnalyte] : undefined
                    }
                    timeRange={timeRange}
                    colors={colors}
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
