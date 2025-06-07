import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router-dom';

interface BigTableRowProps {
  id: string;
  name: string;
  age: number;
  state: string;
  score: number;
  roundedBottom?: boolean;
  surveys: number;
  drugs: string[];
  diet: string;
  bmi: number;
}

export const paddings = 'px-1 py-3';

export const BigTableRow = ({
  id,
  name,
  age,
  state,
  score,
  surveys,
  drugs,
  diet,
  bmi,
  roundedBottom = false,
}: BigTableRowProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        'border-primary-accent divide-primary-accent bg-secondary-accent-25 hover:bg-secondary-accent/60 flex cursor-pointer gap-2 divide-x overflow-auto border-x border-b text-center hover:font-bold',
        roundedBottom && 'rounded-b-sm',
      )}
      onClick={() => navigate(`/patients/${id}`)}
    >
      <div className={`flex-2 ${paddings}`}>{name}</div>
      <div className={`flex-1 ${paddings}`}>{age} </div>
      <div className={`flex-1 ${paddings}`}>{state}</div>
      <div className={`flex-1 ${paddings}`}>{score}</div>
      <div className={`flex-1 ${paddings}`}>{surveys}</div>
      <div className={`flex-4 ${paddings}`}>
        {drugs.length > 0 ? drugs.join(', ') : 'None'}
      </div>
      <div className={`flex-2 ${paddings}`}>{diet}</div>
      <div className={`flex-1 ${paddings}`}>{bmi}</div>
    </div>
  );
};
