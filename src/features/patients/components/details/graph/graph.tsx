import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import { TimeRange } from '@/types';
import { GetPatientScoresDto } from '@/features/scores';
import { DrugDto } from '@/features/drugs';
import {
  analytes,
  GetPatientDiagnosticTestsDto,
} from '@/features/diagnostic_tests';
import { Loading } from '@/components/ui/loading';
import {
  TimeModeButton,
  ShowDrugsButton,
  SelectAnalyteButton,
  ColorPickerButton,
} from './buttons';
import { formatPatientScores, getAnalyteHistory } from './utils';
import { Charts } from './charts';

type GraphProps = {
  patientScores?: GetPatientScoresDto;
  scoresLoading: boolean;
  drugs: DrugDto[];
  diagnosticData?: GetPatientDiagnosticTestsDto;
  isGraphExpanded: boolean;
  resizeGraph: () => void;
};

export const Graph = ({
  patientScores,
  scoresLoading,
  drugs,
  diagnosticData,
  isGraphExpanded,
  resizeGraph,
}: GraphProps) => {
  const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>('cea');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [colors, setColors] = useState({
    scoreColor: '#6b46c1',
    analyteColor: '#e53e3e',
  });
  const [showDrugs, setShowDrugs] = useState(true);

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

  return scoresLoading ? (
    <Loading size={80} />
  ) : !scoreHistory.length ? (
    <div className="flex w-full items-center justify-center text-gray-500">
      No score history available
    </div>
  ) : (
    <div className="flex h-full w-full flex-col rounded-sm pb-8">
      <button
        onClick={resizeGraph}
        className="bg-secondary-accent hover:bg-secondary/50 my-2 flex w-28 items-center justify-center rounded-sm text-2xl hover:cursor-pointer"
      >
        {isGraphExpanded ? <FaAngleDown /> : <FaAngleUp />}
      </button>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <SelectAnalyteButton
          value={selectedAnalyte}
          onChange={setSelectedAnalyte}
          options={analyteHistories}
        />
        <TimeModeButton value={timeRange} onChange={setTimeRange} />
        <ColorPickerButton
          selectedAnalyte={selectedAnalyte}
          selectedAnalyteName={
            selectedAnalyte ? analyteHistories[selectedAnalyte].name : ''
          }
          colors={colors}
          onChange={setColors}
        />
        <ShowDrugsButton
          showDrugs={showDrugs}
          onToggle={() => setShowDrugs((prev) => !prev)}
        />
      </div>
      <div className="flex-grow">
        <Charts
          weeks={scoreHistory.map((p) => p.week)}
          scores={scoreHistory.map((p) => p.score)}
          analyteData={
            selectedAnalyte ? analyteHistories[selectedAnalyte] : undefined
          }
          timeRange={timeRange}
          colors={colors}
          drugs={drugs}
          showDrugs={showDrugs}
        />
      </div>
    </div>
  );
};
