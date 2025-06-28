import Chart from 'react-apexcharts';
import { useMemo } from 'react';
import { TimeRange } from '@/types';

interface Props {
  weeks: string[];
  scores: number[];
  analyteData?: {
    name: string;
    dates: string[];
    values: number[];
  };
  timeRange: TimeRange;
  colors: {
    scoreColor: string;
    analyteColor: string;
  };
}

export const ScoreTimelineChart: React.FC<Props> = ({
  weeks,
  scores,
  analyteData,
  timeRange,
  colors,
}) => {
  const { filteredWeeks, filteredScores, filteredAnalyteData } = useMemo(() => {
    if (timeRange === 'all') {
      return {
        filteredWeeks: weeks,
        filteredScores: scores,
        filteredAnalyteData: analyteData,
      };
    }

    const cutoffDate = new Date();
    if (timeRange === 'month') {
      cutoffDate.setMonth(cutoffDate.getMonth() - 1);
    } else {
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
    }
    const cutoff = cutoffDate.getTime();

    const filteredData = weeks
      .map((w, i) => ({ w, s: scores[i], t: new Date(w).getTime() }))
      .filter(({ t }) => t >= cutoff);

    const ana = analyteData
      ? (() => {
          const pts = analyteData.dates
            .map((d, i) => ({
              d,
              v: analyteData.values[i],
              t: new Date(d).getTime(),
            }))
            .filter(({ t }) => t >= cutoff);
          return {
            name: analyteData.name,
            dates: pts.map((p) => p.d),
            values: pts.map((p) => p.v),
          };
        })()
      : undefined;

    return {
      filteredWeeks: filteredData.map((p) => p.w),
      filteredScores: filteredData.map((p) => p.s),
      filteredAnalyteData: ana,
    };
  }, [weeks, scores, analyteData, timeRange]);

  const maxScore = useMemo(() => {
    if (filteredScores.length === 0) return 10;
    const max = Math.max(...filteredScores);
    if (max <= 12) return Math.ceil(max / 2) * 2;
    if (max <= 100) return Math.ceil(max / 20) * 20;
    return Math.ceil(max / 100) * 100;
  }, [filteredScores]);

  const tickAmount = useMemo(() => {
    if (maxScore <= 12) return 6;
    return 5;
  }, [maxScore]);

  return (
    <Chart
      type="line"
      height="100%"
      width="100%"
      series={[
        { name: 'Score', data: filteredScores },
        ...(filteredAnalyteData
          ? [
              {
                name: filteredAnalyteData.name,
                data: filteredAnalyteData.values,
              },
            ]
          : []),
      ]}
      options={{
        chart: {
          id: 'score-chart',
          zoom: { enabled: false },
          stacked: false,
          toolbar: { show: false },
        },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        colors: [colors.scoreColor, colors.analyteColor],
        xaxis: {
          categories: filteredAnalyteData
            ? [
                ...new Set([...filteredWeeks, ...filteredAnalyteData.dates]),
              ].sort()
            : filteredWeeks,
          labels: { rotate: -45 },
          type: 'datetime',
        },
        yaxis: [
          {
            min: 0,
            max: maxScore,
            tickAmount,
            labels: { formatter: (v: number) => `${v}` },
            title: { text: 'Score' },
          },
          ...(filteredAnalyteData
            ? [
                {
                  opposite: true,
                  min: 0,
                  max:
                    filteredAnalyteData.values.length > 0
                      ? Math.max(...filteredAnalyteData.values) * 1.2
                      : 10,
                  title: {
                    text: filteredAnalyteData.name.toUpperCase(),
                    style: { color: colors.analyteColor },
                  },
                  labels: {
                    style: { colors: colors.analyteColor },
                    formatter: (v: number) => `${v}`,
                  },
                },
              ]
            : []),
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: { formatter: (v: number) => `${v.toFixed(1)}` },
        },
        grid: { strokeDashArray: 4 },
        legend: { show: true },
        responsive: [
          { breakpoint: 640, options: { xaxis: { labels: { rotate: -90 } } } },
        ],
      }}
    />
  );
};
