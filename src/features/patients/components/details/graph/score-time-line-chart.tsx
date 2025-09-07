import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

interface ScoreTimeLineChartProps {
  weeks: string[];
  scores: number[];
  analyteData?: {
    name: string;
    dates: Date[];
    values: number[];
  };
  colors: {
    scoreColor: string;
    analyteColor: string;
  };
  xmin?: number;
}

export const ScoreTimelineChart = ({
  weeks,
  scores,
  analyteData,
  colors,
  xmin,
}: ScoreTimeLineChartProps) => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  return (
    <Chart
      type="line"
      height="100%"
      width="100%"
      series={[
        { name: t('score'), data: scores },
        ...(analyteData
          ? [
              {
                name: t(`analytes.${analyteData.name}`),
                data: analyteData.values,
              },
            ]
          : []),
      ]}
      options={{
        chart: {
          defaultLocale: t('lng'),
          locales: [
            {
              name: 'pl',
              options: {
                months: t('months', { returnObjects: true }) as string[],
                shortMonths: t('shortMonths', {
                  returnObjects: true,
                }) as string[],
              },
            },
          ],
          id: 'score-chart',
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        colors: [colors.scoreColor, colors.analyteColor],
        xaxis: {
          min: xmin,
          max: new Date().getTime(),
          categories: analyteData
            ? [...new Set([...weeks, ...analyteData.dates])].sort()
            : weeks,
          labels: { show: true, rotate: -45 },
          type: 'datetime',
        },
        yaxis: [
          {
            min: 0,
            tickAmount: 5,
            labels: { formatter: (v: number) => `${v}` },
            title: { text: t('score') },
          },
          ...(analyteData
            ? [
                {
                  opposite: true,
                  min: 0,
                  max:
                    analyteData.values.length > 0
                      ? Math.max(...analyteData.values) * 1.2
                      : 10,
                  title: {
                    text: t(`analytes.${analyteData.name}`),
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
          followCursor: true,
          y: { formatter: (v: number) => `${v.toFixed(1)}` },
          x: {
            format: 'dd MMM yyyy',
          },
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
