import Chart from 'react-apexcharts';
import { useMemo, useState } from 'react';

interface Props {
  weeks: string[];
  scores: number[];
}

type TimeRange = 'month' | 'year' | 'all';

export const ScoreTimelineChart: React.FC<Props> = ({ weeks, scores }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');

  // Filter data based on selected time range
  const { filteredWeeks, filteredScores } = useMemo(() => {
    if (timeRange === 'all') {
      return { filteredWeeks: weeks, filteredScores: scores };
    }

    const currentDate = new Date();
    const cutoffDate = new Date();

    if (timeRange === 'month') {
      cutoffDate.setMonth(currentDate.getMonth() - 1);
    } else if (timeRange === 'year') {
      cutoffDate.setFullYear(currentDate.getFullYear() - 1);
    }

    const cutoffTime = cutoffDate.getTime();

    // Filter data points that are newer than the cutoff date
    const filteredData = weeks.map((week, index) => ({
      week,
      score: scores[index],
      date: new Date(week).getTime()
    })).filter(item => item.date >= cutoffTime);

    return {
      filteredWeeks: filteredData.map(item => item.week),
      filteredScores: filteredData.map(item => item.score)
    };
  }, [weeks, scores, timeRange]);

  // Calculate the maximum score value for the Y-axis
  const maxScore = useMemo(() => {
    if (filteredScores.length === 0) return 10; // Default if no scores

    const highestScore = Math.max(...filteredScores);

    // Round up to the nearest appropriate value based on score range
    if (highestScore <= 12) {
      // For UC scores (0-12), round to nearest 2
      return Math.ceil(highestScore / 2) * 2;
    } else if (highestScore <= 100) {
      // For scores up to 100, round to nearest 20
      return Math.ceil(highestScore / 20) * 20;
    } else {
      // For Crohn's scores (0-450), round to nearest 100
      return Math.ceil(highestScore / 100) * 100;
    }
  }, [filteredScores]);

  // Calculate appropriate tick amount based on max score
  const tickAmount = useMemo(() => {
    if (maxScore <= 12) return 6; // For UC scores, show every 2 points
    if (maxScore <= 100) return 5; // For scores up to 100, show 5 ticks
    return 5; // For Crohn's scores, show 5 ticks
  }, [maxScore]);

  return (
    <div className="relative h-full">
      <div className="absolute top-0 right-0 z-10">
        <div className="inline-flex rounded-md gap-1">
          <button
            type="button"
            className={`px-3 py-1 text-xs font-medium rounded-l-md ${timeRange === 'month'
              ? 'bg-secondary-accent text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-xs font-medium ${timeRange === 'year'
              ? 'bg-secondary-accent text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-xs font-medium rounded-r-md ${timeRange === 'all'
              ? 'bg-secondary-accent text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setTimeRange('all')}
          >
            All
          </button>
        </div>
      </div>

      <Chart
        type="line"
        height="100%"
        width="100%"
        series={[{ name: 'Score', data: filteredScores }]}
        options={{
          chart: {
            id: 'score-chart',
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          stroke: { curve: 'smooth', width: 2 },
          markers: { size: 4 },
          colors: ['#6b46c1'],
          xaxis: {
            categories: filteredWeeks,
            labels: { rotate: -45 },
            type: 'datetime'
          },
          yaxis: {
            min: 0,
            max: maxScore,
            tickAmount: tickAmount,
            labels: { formatter: (v: number) => `${v}` },
            title: { text: 'Score' },
          },
          tooltip: { y: { formatter: (v: number) => `${v}` } },
          grid: { strokeDashArray: 4 },
          legend: { show: false },
          responsive: [
            { breakpoint: 640, options: { xaxis: { labels: { rotate: -90 } } } },
          ],
        }}
      />
    </div>
  );
};
