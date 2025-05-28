import Layout from '@/components/layout';
import { FiFilePlus, FiFlag } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';
import { CalendarDashboard, useGetVisits } from '@/features/visits';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import { ItemCard, PatientsTable } from '@/features/patient';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: visits, isLoading } = useGetVisits();

  return (
    <Layout>
      <div className="flex w-full flex-col gap-2.5 overflow-y-visible">
        <div className={cn(borderClasses, 'w-full gap-10 px-4')}>
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
              navigate('/patients');
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
        <div className={'flex h-100 w-full gap-3'}>
          <div className={cn(borderClasses, 'h-full w-[65%] px-1.5')}>
            <PatientsTable />
          </div>
          <div className={cn(borderClasses, 'h-full w-[35%] px-1.5')}>
            <div className="w-full">
              {isLoading ? (
                <Loading size={100} />
              ) : (
                <CalendarDashboard visits={visits} />
              )}
            </div>
          </div>
        </div>
        <div className={cn(borderClasses, 'h-60 w-full px-1.5')}>
          <div className="bg-primary w-full">GRAFIK</div>
        </div>
      </div>
    </Layout>
  );
};
