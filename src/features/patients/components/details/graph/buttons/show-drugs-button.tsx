import { useTranslation } from 'react-i18next';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

interface ShowDrugsButtonProps {
  showDrugs: boolean;
  onToggle: () => void;
}

export const ShowDrugsButton = ({
  showDrugs,
  onToggle,
}: ShowDrugsButtonProps) => {
  const { t } = useTranslation('patients');
  return (
    <button
      onClick={onToggle}
      className="text-primary-accent hover:text-primary/70 flex items-center"
    >
      {showDrugs ? (
        <FaCheckSquare className="mr-2 size-5" />
      ) : (
        <FaRegSquare className="mr-2 size-5" />
      )}
      {showDrugs ? t('hideDrugs') : t('showDrugs')}
    </button>
  );
};
