import { useTranslation } from 'react-i18next';

interface SelectAnalyteButtonProps {
  selectedAnalyte: string | null;
  analytes: Record<string, { name: string }>;
  onChange: (newValue: string | null) => void;
}

export const SelectAnalyteButton = ({
  selectedAnalyte,
  analytes,
  onChange,
}: SelectAnalyteButtonProps) => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  return (
    <select
      value={selectedAnalyte ?? ''}
      onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
      className="text-primary-accent focus:border-secondary-accent rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:outline-none"
    >
      <option value="">{t('scoreOnly')}</option>
      {Object.entries(analytes).map(([k, d]) => (
        <option key={k} value={k}>
          {t(`analytes.${d.name}`)}
        </option>
      ))}
    </select>
  );
};
