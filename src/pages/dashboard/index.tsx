import Layout from '@/components/layout';
import { FiFilePlus, FiFlag } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';

import { useTranslation } from 'react-i18next';
import { CalendarStyle } from './calendar-style';
import { ItemCard } from './item-card';
import { useNavigate } from 'react-router-dom';
import { PatientsTable } from './patients-table';

const borderClasses =
  'flex w-full bg-foreground border-2 border-primary-accent/60 rounded-sm py-2 shadow-primary-accent shadow-xs';

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex w-full flex-col gap-2.5 overflow-y-visible">
        <div className={cn(borderClasses, 'gap-10 px-4')}>
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
        <div className={cn(borderClasses, 'h-100 gap-3 px-1.5')}>
          <PatientsTable />
          <div
            onClick={() => {
              navigate('/calendar');
            }}
            className="hover:ring-secondary w-[35%] rounded-xs text-xs hover:cursor-pointer hover:opacity-60"
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              firstDay={1}
              height={'100%'}
              locale={t('language') === 'pl' ? plLocale : enLocale}
              timeZone="pl"
              headerToolbar={{
                left: '',
                center: 'title',
                right: '',
              }}
            />
          </div>
        </div>
        <div className={cn(borderClasses, 'h-60 px-1.5')}>
          <div className="bg-primary w-full">GRAFIK</div>
        </div>
      </div>
      <CalendarStyle />
    </Layout>
  );
};
