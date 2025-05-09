import Layout from '@/components/layout';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiFilePlus, FiFlag } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';

type ItemCardProps = {
  title: string;
  number: number;
  icon: React.ReactNode;
  subtitle: string;
  onClick: () => void;
};

const ItemCardChart = () => {
  const data = [30, 15, 10, 32];
  const hModifier = 5;
  const normalizedData = data.map(
    (value) => ((value + hModifier) / (Math.max(...data) + hModifier)) * 5,
  );
  return (
    <div className="flex h-full w-full items-end gap-1">
      {normalizedData.map((value, index) => (
        <div
          key={index}
          className={`${index === 3 ? 'bg-secondary' : 'bg-secondary-accent'} h-full flex-1 rounded-lg`}
          style={{ height: `${value}rem` }}
        />
      ))}
    </div>
  );
};

const ItemCard = (props: ItemCardProps) => {
  return (
    <div className="bg-foreground text-primary-accent flex h-40 flex-1 flex-col gap-2 p-4">
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

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="h-full w-full flex-col">
        <div className="flex w-full gap-10 border px-4 py-2">
          <ItemCard
            title={t('dashboard.cards.surveys.title')}
            number={44}
            icon={<FiFilePlus className="size-8" />}
            subtitle={t('dashboard.cards.surveys.subtitle')}
            onClick={() => {
              console.log('Ankiety clicked');
            }}
          />
          <ItemCard
            title={t('dashboard.cards.patients.title')}
            number={23}
            icon={<BsPeople className="size-8" />}
            subtitle={t('dashboard.cards.patients.subtitle')}
            onClick={() => {
              console.log('Ankiety clicked');
            }}
          />
          <ItemCard
            title={t('dashboard.cards.state-of-emergency.title')}
            number={2}
            icon={<FiFlag className="size-8" />}
            subtitle={t('dashboard.cards.state-of-emergency.subtitle')}
            onClick={() => {
              console.log('Ankiety clicked');
            }}
          />
        </div>
        <div className="flex w-full px-4 py-2"></div>
      </div>
    </Layout>
  );
};
