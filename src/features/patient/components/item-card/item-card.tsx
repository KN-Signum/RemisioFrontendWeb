import { FaArrowRightLong } from 'react-icons/fa6';
import { ItemCardChart } from '../..';

type ItemCardProps = {
  title: string;
  number: number;
  icon: React.ReactNode;
  subtitle: string;
  onClick: () => void;
};

export const ItemCard = (props: ItemCardProps) => {
  const { title, number, icon, subtitle, onClick } = props;
  return (
    <div className="bg-primary/40 text-primary-accent border-primary-accent/60 flex h-full flex-1 flex-col gap-2 rounded-xs border px-7 py-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {icon}
          <span className="line-clamp-1 text-xl">{title}</span>
        </div>
        <FaArrowRightLong
          className="hover:bg-primary-accent/10 size-8 rounded-full p-1 hover:cursor-pointer"
          onClick={onClick}
        />
      </div>
      <hr className="bg-primary-accent w h-0.5" />
      <div className="mt-2 flex h-full gap-2">
        <div className="flex flex-col justify-between">
          <span className="text-4xl">{number}</span>
          <span className="text-primary-accent line-clamp-2 w-29 text-sm">
            {subtitle}
          </span>
        </div>
        <ItemCardChart />
      </div>
    </div>
  );
};
