import Chart from 'react-apexcharts';
import { useMemo } from 'react';
import { TimeRange } from '@/types';

interface DrugBar {
  name: string;
  start: string;
  end?: string | null;
}

interface ScoreTimeLineChartProps {
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
  drugBars?: DrugBar[];
  drugBandHeight?: number;


}

export const ScoreTimelineChart = ({
  weeks,
  scores,
  analyteData,
  timeRange,
  colors,
  drugBars = [],
  drugBandHeight = 0.08,
}: ScoreTimeLineChartProps) => {
  const { filteredWeeks, filteredScores, filteredAnalyteData } = useMemo(() => {
    if (timeRange === 'all')
      return { filteredWeeks: weeks, filteredScores: scores, filteredAnalyteData: analyteData };
    const cutoffDate = new Date();
    if (timeRange === 'month') cutoffDate.setMonth(cutoffDate.getMonth() - 1);
    else cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
    const cutoff = cutoffDate.getTime();
    const filteredData = weeks
      .map((w, i) => ({ w, s: scores[i], t: new Date(w).getTime() }))
      .filter(({ t }) => t >= cutoff);
    const ana = analyteData
      ? (() => {
        const pts = analyteData.dates
          .map((d, i) => ({ d, v: analyteData.values[i], t: new Date(d).getTime() }))
          .filter(({ t }) => t >= cutoff);
        return { name: analyteData.name, dates: pts.map((p) => p.d), values: pts.map((p) => p.v) };
      })()
      : undefined;
    return {
      filteredWeeks: filteredData.map((p) => p.w),
      filteredScores: filteredData.map((p) => p.s),
      filteredAnalyteData: ana,
    };
  }, [weeks, scores, analyteData, timeRange]);

  const maxScore = useMemo(() => {
    if (!filteredScores.length) return 10;
    const max = Math.max(...filteredScores);
    if (max <= 12) return Math.ceil(max / 2) * 2;
    if (max <= 100) return Math.ceil(max / 20) * 20;
    return Math.ceil(max / 100) * 100;
  }, [filteredScores]);

  const tickAmount = maxScore <= 12 ? 6 : 5;

  const scoreSeries = filteredWeeks.map((w, i) => ({ x: new Date(w).getTime(), y: filteredScores[i] }));
  const analyteSeries =
    filteredAnalyteData && filteredAnalyteData.dates.length
      ? filteredAnalyteData.dates.map((d, i) => ({ x: new Date(d).getTime(), y: filteredAnalyteData.values[i] }))
      : [];

  const drugAnnotations = useMemo(() => {
    const palette = ['#63b3ed80', '#f6ad5580', '#68d39180', '#f5656580', '#9f7aea80', '#ed893680'];
    const bandTop = maxScore * drugBandHeight;
    return drugBars.map((db, i) => ({
      x: new Date(db.start).getTime(),
      x2: new Date(db.end || new Date()).getTime(),
      y: 0,
      y2: bandTop,
      fillColor: palette[i % palette.length],
      opacity: 0.6,
      label: {
        text: db.name,
        style: { color: '#000', fontSize: '11px' },
        position: 'top',
      },
    }));
  }, [drugBars, maxScore, drugBandHeight]);

  const axisExtremes = useMemo(() => {
    const xs = scoreSeries.map((p) => p.x);
    if (analyteSeries.length) xs.push(...analyteSeries.map((p) => p.x));
    drugAnnotations.forEach((d) => {
      xs.push(d.x);
      xs.push(d.x2);
    });
    return { min: Math.min(...xs), max: Math.max(...xs) };
  }, [scoreSeries, analyteSeries, drugAnnotations]);

  return (
    <Chart
      type="line"
      height="100%"
      width="100%"
      series={[
        { name: 'Score', data: scoreSeries },
        ...(filteredAnalyteData ? [{ name: filteredAnalyteData.name, data: analyteSeries }] : []),
      ]}
      options={{
        chart: { id: 'score-chart', zoom: { enabled: false }, toolbar: { show: false } },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        colors: [colors.scoreColor, colors.analyteColor],
        annotations: { xaxis: drugAnnotations },
        xaxis: { type: 'datetime', labels: { rotate: -45 }, min: axisExtremes.min, max: axisExtremes.max },
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
                max: filteredAnalyteData.values.length
                  ? Math.max(...filteredAnalyteData.values) * 1.2
                  : 10,
                title: { text: filteredAnalyteData.name.toUpperCase(), style: { color: colors.analyteColor } },
                labels: { style: { colors: colors.analyteColor }, formatter: (v: number) => `${v}` },
              },
            ]
            : []),
        ],
        tooltip: { shared: true, intersect: false, followCursor: true, y: { formatter: (v: number) => `${v.toFixed(1)}` } },
        grid: { strokeDashArray: 4 },
        legend: { show: true },
        responsive: [{ breakpoint: 640, options: { xaxis: { labels: { rotate: -90 } } } }],
      }}
    />
  );
};
