import { FaArrowRightLong } from 'react-icons/fa6';
import { ItemCardChart } from './item-card-chart';

type ItemCardProps = {
  title: string;
  number: number;
  icon: React.ReactNode;
  subtitle: string;
  onClick: () => void;
};

export const ItemCard = (props: ItemCardProps) => {
  return (
    <div className="bg-foreground text-primary-accent flex h-45 flex-1 flex-col gap-2 rounded-xs p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {props.icon}
          <span className="line-clamp-1 text-xl">{props.title}</span>
        </div>
        <FaArrowRightLong className="hover:bg-primary-accent/10 size-8 rounded-full p-1 hover:cursor-pointer" />
      </div>
      <hr className="bg-primary-accent h-0.5" />
      <div className="mt-1 flex h-full gap-2">
        <div className="flex flex-col justify-between">
          <span className="text-xl font-bold">{props.number}</span>
          <span className="text-primary-accent line-clamp-2 w-25 text-xs">
            {props.subtitle}
          </span>
        </div>
        <ItemCardChart />
      </div>
    </div>
  );
};
