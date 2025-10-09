import { cn } from '@/utils/common';
import { useNavigate } from 'react-router-dom';

interface TableRowProps {
  id: string;
  name: string;
  age: number;
  state: string;
  score: number;
  roundedBottom?: boolean;
}

export const paddings = 'px-4 py-3';

export const TableRow = ({
  id,
  name,
  age,
  state,
  score,
  roundedBottom = false,
}: TableRowProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        'border-primary-accent divide-primary-accent bg-secondary-accent-25 hover:bg-secondary-accent/60 flex cursor-pointer gap-2 divide-x overflow-auto border-x border-b text-center hover:font-bold',
        roundedBottom && 'rounded-b-sm',
      )}
      onClick={() => navigate(`/patients/${id}`)}
    >
      <div className={`flex-3 ${paddings}`}>{name}</div>
      <div className={`flex-2 ${paddings}`}>{age} </div>
      <div className={`flex-2 ${paddings}`}>{state}</div>
      <div className={`flex-2 ${paddings}`}>{score}</div>
    </div>
  );
};
