import { TimeRange } from '@/utils/types';
import { ScoreTimelineChart } from './score-time-line-chart';
import { DrugTimeBarChart } from './drug-time-bar-chart';
import { Drug } from '@/features/drugs';
import { useMemo } from 'react';

interface ChartsProps {
  weeks: string[];
  scores: number[];
  analyteData?: {
    name: string;
    dates: Date[];
    values: number[];
  };
  timeRange: TimeRange;
  colors: {
    scoreColor: string;
    analyteColor: string;
  };
  drugs?: Drug[];
  showDrugs: boolean;
}

export const Charts = ({
  weeks,
  scores,
  analyteData,
  timeRange,
  colors,
  drugs,
  showDrugs,
}: ChartsProps) => {
  const xmin = useMemo(() => {
    switch (timeRange) {
      case 'month':
        return new Date(
          new Date().setMonth(new Date().getMonth() - 1),
        ).getTime();
      case 'year':
        return new Date(
          new Date().setFullYear(new Date().getFullYear() - 1),
        ).getTime();
      case 'all':
        return new Date(weeks[0]).getTime();
      default:
        return undefined;
    }
  }, [timeRange, weeks]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 z-9">
        <ScoreTimelineChart
          xmin={xmin}
          weeks={weeks}
          scores={scores}
          analyteData={analyteData}
          colors={colors}
        />
      </div>
      {showDrugs && drugs && drugs.length > 0 && (
        <div className={'absolute inset-0 z-10 mr-18 mb-10 ml-11'}>
          <DrugTimeBarChart xmin={xmin} drugs={drugs} />
        </div>
      )}
    </div>
  );
};
