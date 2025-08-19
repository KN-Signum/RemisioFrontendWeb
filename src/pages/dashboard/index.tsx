import Layout from '@/components/layout/main';
import { FiFilePlus, FiFlag } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';
import { CalendarDashboard, useGetVisits } from '@/features/visits';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/ui/loading';
import {
  ItemCard,
  DashboardPatientsTable,
  useGetPatients,
} from '@/features/patients';

const borderClasses =
  'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

export const Dashboard = () => {
  const { t } = useTranslation('', { keyPrefix: 'pages.dashboard' });
  const navigate = useNavigate();
  const {
    data: patients,
    isLoading: patientsLoading,
    isError: patientsError,
  } = useGetPatients();
  const {
    data: visits,
    isLoading: visitsLoading,
    isError: visitsError,
  } = useGetVisits();

  return (
    <Layout>
      <div className="flex w-full flex-col gap-2.5 overflow-y-visible">
        <div className={cn(borderClasses, 'h-63 w-full gap-10 px-4')}>
          {/* TODO: Fix how it looks */}
          {/* TODO: Add functionality */}
          <ItemCard
            title={t('cards.surveys.title')}
            number={44}
            icon={<FiFilePlus className="size-8" />}
            subtitle={t('cards.surveys.subtitle')}
            onClick={() => {
              console.log('Ankiety clicked');
            }}
          />
          <ItemCard
            title={t('cards.patients.title')}
            number={23}
            icon={<BsPeople className="size-8" />}
            subtitle={t('cards.patients.subtitle')}
            onClick={() => {
              navigate('/patients');
            }}
          />
          <ItemCard
            title={t('cards.stateOfEmergency.title')}
            number={2}
            icon={<FiFlag className="size-8" />}
            subtitle={t('cards.stateOfEmergency.subtitle')}
            onClick={() => {
              console.log('Ankiety clicked');
            }}
          />
        </div>
        <div className={'flex h-100 w-full gap-3'}>
          <div className={cn(borderClasses, 'h-full w-[65%] px-1.5')}>
            <div className="w-full">
              {patientsLoading ? (
                <Loading size={100} />
              ) : // TODO: Handle error state
              patientsError ? (
                <div className="flex h-full items-center justify-center text-3xl text-red-500">
                  Error
                </div>
              ) : (
                <DashboardPatientsTable patients={patients} />
              )}
            </div>
          </div>
          <div className={cn(borderClasses, 'h-full w-[35%] px-1.5')}>
            <div className="w-full">
              {visitsLoading ? (
                <Loading size={100} />
              ) : // TODO: Handle error state
              visitsError ? (
                <div className="flex h-full items-center justify-center text-3xl text-red-500">
                  Error
                </div>
              ) : (
                <CalendarDashboard visits={visits || []} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
