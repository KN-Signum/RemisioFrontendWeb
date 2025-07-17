import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import { ScoreTimelineChart } from './score-time-line-chart';
import { TimeRange } from '@/types';
import { GetPatientScoresDto } from '@/features/score';
import { DrugDto } from '@/features/drug';
import {
  analytes,
  GetPatientDiagnosticTestsDto,
} from '@/features/diagnostic_tests';
import { Loading } from '@/components/ui/loading';
import { ColorPickerButton } from './color-picker-button';
import { TimeModeButton } from './time-mode-button';
import { SelectAnalyteButton } from './select-analyte-button';
import { formatPatientScores, getAnalyteHistory } from './utils';

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
      <div className="mb-4 flex flex-wrap items-center gap-4">
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
  );
};
