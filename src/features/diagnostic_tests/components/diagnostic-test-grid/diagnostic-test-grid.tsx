import { Loading } from '@/components/ui/loading';
import {
  Analyte,
  DiagnosticTest,
  getLatestTestsToGrid,
} from '@/features/diagnostic_tests';
import { useTranslation } from 'react-i18next';

interface DiagnosticTestsGridProps {
  diagnosticTests: DiagnosticTest[];
  loading: boolean;
  error: Error | null;
}

const bigTiles: Set<Analyte> = new Set([
  'calprotectin_feces',
  'erythrocytes',
  'mch',
  'hemoglobin',
  'hct',
  'leukocytes',
  'ob',
  'ast',
  'bilirubin',
  'alkaline_phosphatase',
  'basophils',
  'mchc',
  'monocytes',
  'neutrophils',
] as const);

const statusChipColor = {
  normal: 'bg-emerald-100 text-emerald-600',
  high: 'bg-rose-100 text-rose-600',
  low: 'bg-amber-100 text-amber-600',
} as const;

const genPath = (vals: number[]) => {
  if (!vals.length) return '';
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const step = 100 / (vals.length - 1);
  const norm = (v: number) =>
    max === min ? 10 : 10 + ((v - min) * 10) / (max - min);
  return vals
    .map((v, i) => `${i ? 'L' : 'M'} ${i * step} ${20 - norm(v)}`)
    .join(' ');
};

export const DiagnosticTestsGrid = ({
  diagnosticTests,
  loading,
  error,
}: DiagnosticTestsGridProps) => {
  const { t: tg } = useTranslation('', { keyPrefix: 'general' });
  const { t } = useTranslation('patients');

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex w-[55%] items-center justify-center font-bold text-red-500">
        {t('failedToLoadTests')}
      </div>
    );
  if (diagnosticTests.length === 0)
    return (
      <div className="flex w-full items-center justify-center font-bold text-red-500">
        {t('noTestsFound')}
      </div>
    );

  const gridTests = getLatestTestsToGrid(diagnosticTests);
  return (
    <div className="grid w-[65%] [grid-auto-flow:dense] auto-rows-[5.5rem] grid-cols-6 gap-1 overflow-y-auto rounded-sm p-1">
      {gridTests.map((test, idx) => {
        const large = bigTiles.has(test.name);
        const span = large ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1';
        const bg = large
          ? 'color-mix(in oklch, var(--color-primary) 20%, white)'
          : 'color-mix(in oklch, var(--color-secondary) 20%, white)';

        const isNumeric = typeof test.value === 'number';
        const size = large
          ? isNumeric
            ? 'text-2xl'
            : 'text-xl'
          : isNumeric
            ? 'text-xl'
            : 'text-lg';

        const showStatusChip = isNumeric;

        const d = genPath(test.history);
        const area = d + ' L 100 20 L 0 20 Z';
        const gradId = `vgrad-${idx}`;
        const hGradId = `hgrad-${idx}`;
        const maskId = `mask-${idx}`;

        return (
          <div
            key={test.name}
            className={`${span} relative flex flex-col justify-between rounded-xl border p-3`}
            style={{
              backgroundImage: `linear-gradient(235deg, ${bg} 0%, #ffffff 100%)`,
            }}
          >
            <span className="line-clamp-2 text-[0.70rem] font-semibold tracking-wide text-gray-700 uppercase">
              {tg(`analytes.${test.name}`)}
            </span>

            <span
              className={`${size} leading-none font-bold tracking-tight text-gray-900`}
            >
              {isNumeric ? test.value : tg(test.unit.toLowerCase())}
            </span>

            {test.unit && (
              <span className="text-[0.60rem] text-gray-400">
                {isNumeric && test.unit}
              </span>
            )}

            {large && (
              <svg
                viewBox="0 0 100 20"
                className="absolute right-2 bottom-2 h-8 w-36 text-emerald-500"
              >
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                  </linearGradient>

                  <linearGradient id={hGradId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="10%" stopColor="white" stopOpacity="1" />
                    <stop offset="90%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <mask id={maskId}>
                    <rect width="100" height="20" fill={`url(#${hGradId})`} />
                  </mask>
                </defs>

                <path
                  d={area}
                  fill={`url(#${gradId})`}
                  mask={`url(#${maskId})`}
                />
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  mask={`url(#${maskId})`}
                />
              </svg>
            )}

            {showStatusChip && (
              <span
                className={`absolute ${
                  large ? 'top-2 right-2' : 'right-2 bottom-2'
                } rounded-full px-2 py-[2px] text-[0.55rem] font-medium ${statusChipColor[test.status]}`}
              >
                {tg(`status.${test.status}`)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
