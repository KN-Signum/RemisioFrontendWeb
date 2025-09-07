import Chart from 'react-apexcharts';
import { useMemo } from 'react';
import { DrugDto } from '@/features/drugs';
import { useTranslation } from 'react-i18next';

export type DrugBar = { name: string; start: string; end: string | null };

interface DrugTimeBarChartProps {
  drugs: DrugDto[];
  xmin?: number;
}

export const DrugTimeBarChart = ({ drugs, xmin }: DrugTimeBarChartProps) => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  const drugBars = useMemo(() => {
    return drugs.map((drug) => ({
      name: drug.drug_name,
      start: drug.date_from,
      end: drug.date_to ? drug.date_to : null,
    }));
  }, [drugs]);

  const series = [
    {
      data: drugBars.map((bar) => ({
        x: bar.name,
        y: [
          new Date(bar.start).getTime(),
          bar.end ? new Date(bar.end).getTime() : new Date().getTime(),
        ],
      })),
    },
  ];

  // generate one gradient per bar
  const COLORS = drugBars.map((_, i) => {
    const hue = Math.round((i * 360) / drugBars.length);
    return `hsl(${hue}, 70%, 50%)`;
  });
  const TO_COLORS = drugBars.map((_, i) => {
    const hue = Math.round((i * 360) / drugBars.length);
    return `hsl(${hue}, 70%, 80%)`;
  });

  return (
    <Chart
      type="rangeBar"
      height="100%"
      width="100%"
      series={series}
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
          type: 'rangeBar',
          zoom: { enabled: false },
          toolbar: { show: false },
          id: 'drugs-bar-chart',
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            hideZeroBarsWhenGrouped: true,
            borderRadiusApplication: 'around',
            horizontal: true,
            distributed: true,
            barHeight: '100%',
          },
        },
        colors: COLORS,
        fill: {
          type: 'gradient' as const,
          gradient: {
            shade: 'light',
            type: 'horizontal' as const,
            shadeIntensity: 0.5,
            inverseColors: false,
            gradientToColors: TO_COLORS,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [0, 100],
          },
        },
        dataLabels: {
          enabled: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (_val: string, opts: any) =>
            opts.w.config.series[0].data[opts.dataPointIndex].x,
          style: { colors: ['#000'] },
          offsetY: 0,
        },
        xaxis: {
          min: xmin,
          max: new Date().getTime(),
          type: 'datetime' as const,
          labels: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: {
          shared: false,
          x: {
            format: 'dd MMM yyyy',
          },
        },
      }}
    />
  );
};
