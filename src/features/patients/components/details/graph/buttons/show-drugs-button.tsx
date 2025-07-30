import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

interface ShowDrugsButtonProps {
  showDrugs: boolean;
  onToggle: () => void;
}

export const ShowDrugsButton = ({
  showDrugs,
  onToggle,
}: ShowDrugsButtonProps) => (
  <button
    onClick={onToggle}
    className="text-primary-accent hover:text-primary/70 flex items-center"
  >
    {showDrugs ? (
      <FaCheckSquare className="mr-2 size-4.5" />
    ) : (
      <FaRegSquare className="mr-2 size-4.5" />
    )}
    {showDrugs ? 'Hide Drugs' : 'Show Drugs'}
  </button>
);
