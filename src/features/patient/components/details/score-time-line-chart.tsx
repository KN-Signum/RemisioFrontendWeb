import Chart from 'react-apexcharts';
import { useMemo, useState } from 'react';

interface Props {
  weeks: string[];
  scores: number[];
  analyteData?: {
    name: string;
    dates: string[];
    values: number[];
  };
  colors?: {
    scoreColor?: string;
    analyteColor?: string;
  };
}

type TimeRange = 'month' | 'year' | 'all';

export const ScoreTimelineChart: React.FC<Props> = ({
  weeks,
  scores,
  analyteData,
  colors: initialColors = { scoreColor: '#6b46c1', analyteColor: '#e53e3e' }
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [colors, setColors] = useState(initialColors);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Filter data based on selected time range
  const { filteredWeeks, filteredScores, filteredAnalyteData } = useMemo(() => {
    if (timeRange === 'all') {
      return {
        filteredWeeks: weeks,
        filteredScores: scores,
        filteredAnalyteData: analyteData ? {
          ...analyteData,
          dates: analyteData.dates,
          values: analyteData.values
        } : undefined
      };
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

    // Filter analyte data if available
    let filteredAnalyteData = undefined;
    if (analyteData) {
      const filteredAnalytePoints = analyteData.dates.map((date, index) => ({
        date,
        value: analyteData.values[index],
        timestamp: new Date(date).getTime()
      })).filter(item => item.timestamp >= cutoffTime);

      filteredAnalyteData = {
        name: analyteData.name,
        dates: filteredAnalytePoints.map(item => item.date),
        values: filteredAnalytePoints.map(item => item.value)
      };
    }

    return {
      filteredWeeks: filteredData.map(item => item.week),
      filteredScores: filteredData.map(item => item.score),
      filteredAnalyteData
    };
  }, [weeks, scores, analyteData, timeRange]);

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
      <div className="absolute top-0 right-0 z-10 flex flex-col items-end gap-2">
        {/* Time range selector */}
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

        {/* Color customization button */}
        <div>
          <button
            type="button"
            className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md flex items-center gap-1"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <span>{analyteData ? "Customize Colors" : "Customize Score Color"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8"></path>
              <path d={showColorPicker ? "M8 12h8" : ""}></path>
            </svg>
          </button>

          {/* Color picker panel */}
          {showColorPicker && (
            <div className="mt-2 p-3 bg-white shadow-lg rounded-md border border-gray-200">
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Score Color
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: colors.scoreColor }}
                  ></div>
                  <input
                    type="color"
                    value={colors.scoreColor}
                    onChange={(e) => setColors({ ...colors, scoreColor: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              {analyteData && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {analyteData.name} Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: colors.analyteColor }}
                    ></div>
                    <input
                      type="color"
                      value={colors.analyteColor}
                      onChange={(e) => setColors({ ...colors, analyteColor: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Reset button */}
              <button
                type="button"
                className="w-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md"
                onClick={() => setColors({ scoreColor: '#6b46c1', analyteColor: '#e53e3e' })}
              >
                Reset to Default Colors
              </button>
            </div>
          )}
        </div>
      </div>

      <Chart
        type="line"
        height="100%"
        width="100%"
        series={[
          { name: 'Score', data: filteredScores },
          ...(filteredAnalyteData ? [{
            name: filteredAnalyteData.name,
            data: filteredAnalyteData.values,
            type: 'line'
          }] : [])
        ]}
        options={{
          chart: {
            id: 'score-chart',
            toolbar: { show: false },
            zoom: { enabled: false },
            stacked: false,
          },
          stroke: { curve: 'smooth', width: 2 },
          markers: { size: 4 },
          colors: [colors.scoreColor, colors.analyteColor],
          xaxis: {
            categories: filteredAnalyteData ?
              [...new Set([...filteredWeeks, ...filteredAnalyteData.dates])].sort() :
              filteredWeeks,
            labels: { rotate: -45 },
            type: 'datetime'
          },
          yaxis: [
            {
              min: 0,
              max: maxScore,
              tickAmount: tickAmount,
              labels: { formatter: (v: number) => `${v}` },
              title: { text: 'Score' },
            },
            ...(filteredAnalyteData ? [{
              opposite: true,
              min: 0,
              max: filteredAnalyteData.values.length > 0 ?
                Math.max(...filteredAnalyteData.values) * 1.2 : 10,
              title: {
                text: filteredAnalyteData.name.toUpperCase(),
                style: { color: colors.analyteColor }
              },
              labels: {
                style: { colors: colors.analyteColor },
                formatter: (v: number) => `${v}`
              }
            }] : [])
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: { formatter: (v: number) => `${v}` }
          },
          grid: { strokeDashArray: 4 },
          legend: { show: true },
          responsive: [
            { breakpoint: 640, options: { xaxis: { labels: { rotate: -90 } } } },
          ],
        }}
      />
    </div>
  );
};
