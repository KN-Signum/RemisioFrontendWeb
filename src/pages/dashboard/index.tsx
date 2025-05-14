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

const borderClasses = 'flex w-full border-2 border-white/50 rounded-sm py-2';

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex w-full flex-col gap-1 overflow-y-visible">
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
            className="from-secondary hover:ring-secondary w-[35%] rounded-xs bg-gradient-to-b from-20% to-transparent to-20% text-xs hover:cursor-pointer hover:opacity-60 hover:ring-2"
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              firstDay={1}
              height={'100%'}
              locale={t('language') === 'pl' ? plLocale : enLocale}
              timeZone="pl"
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
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
