import Layout from '@/components/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import { CalendarStyle } from './calendar-style';

export const Calendar = () => {
  return (
    <Layout>
      <div className="bg-foreground border-primary-accent/60 shadow-primary-accent h-full w-full rounded-sm border-2 px-4 py-2 shadow-xs">
        <div className="from-secondary h-full w-full rounded-sm">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            firstDay={1}
            height={'100%'}
            locale={plLocale}
            timeZone="pl"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
          />
        </div>
      </div>
      <CalendarStyle />
    </Layout>
  );
};
