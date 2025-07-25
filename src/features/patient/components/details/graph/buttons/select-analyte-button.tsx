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
    className="text-primary-accent focus:border-secondary-accent rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:outline-none"
  >
    <option value="">Score Only</option>
    {Object.entries(options).map(([k, d]) => (
      <option key={k} value={k}>
        {d.name}
      </option>
    ))}
  </select>
);
