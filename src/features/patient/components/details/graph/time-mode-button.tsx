import { TimeRange } from '@/types';

interface TimeModeButtonProps {
  value: TimeRange;
  onChange: (newRange: TimeRange) => void;
}

export const TimeModeButton = ({ value, onChange }: TimeModeButtonProps) => {
  return (
    <div className="inline-flex overflow-hidden rounded-md">
      {(['month', 'year', 'all'] as TimeRange[]).map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-3 py-1 text-xs font-medium ${
            value === r
              ? 'bg-secondary-accent text-white'
              : 'text-primary-accent bg-gray-200 hover:bg-gray-300'
          } ${
            r === 'month' ? 'rounded-l-md' : r === 'all' ? 'rounded-r-md' : ''
          }`}
        >
          {r === 'month' ? 'Month' : r === 'year' ? 'Year' : 'All'}
        </button>
      ))}
    </div>
  );
};
