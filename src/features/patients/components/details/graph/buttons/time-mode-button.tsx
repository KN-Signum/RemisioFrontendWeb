import { TimeRange } from '@/types';
import { useTranslation } from 'react-i18next';

interface TimeModeButtonProps {
  selectedRange: TimeRange;
  onChange: (newRange: TimeRange) => void;
}

export const TimeModeButton = ({
  selectedRange,
  onChange,
}: TimeModeButtonProps) => {
  const { t } = useTranslation('', { keyPrefix: 'general.timeRanges' });
  return (
    <div className="inline-flex overflow-hidden rounded-md">
      {(['month', 'year', 'all'] as TimeRange[]).map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-3 py-1.5 text-xs font-medium ${
            selectedRange === range
              ? 'bg-secondary-accent text-white'
              : 'text-primary-accent bg-gray-200 hover:bg-gray-300'
          } ${
            range === 'month'
              ? 'rounded-l-md'
              : range === 'all'
                ? 'rounded-r-md'
                : ''
          }`}
        >
          {t(range)}
        </button>
      ))}
    </div>
  );
};
