import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CalendarStyleDashboard } from '../..';

export const CalendarDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate('/calendar');
      }}
      className="hover:ring-secondary w-full rounded-xs text-xs hover:cursor-pointer hover:opacity-60"
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
      <CalendarStyleDashboard />
    </div>
  );
};
