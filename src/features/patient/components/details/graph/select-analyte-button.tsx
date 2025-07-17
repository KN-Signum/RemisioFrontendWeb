interface SelectAnalyteButtonProps {
  value: string | null;
  options: Record<string, { name: string }>;
  onChange: (newValue: string | null) => void;
}

export const SelectAnalyteButton = ({
  value,
  options,
  onChange,
}: SelectAnalyteButtonProps) => (
  <select
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
    className="text-primary-accent rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
  >
    <option value="">Score Only</option>
    {Object.entries(options).map(([k, d]) => (
      <option key={k} value={k}>
        {d.name}
      </option>
    ))}
  </select>
);
