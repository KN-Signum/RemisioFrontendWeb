import Layout from '@/components/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import { CalendarStyle } from './calendar-style';

export const Calendar = () => {
  return (
    <Layout>
      <div className="h-full w-full rounded-sm border-2 border-white/50 p-4">
        <div className="from-secondary h-full w-full rounded-sm bg-gradient-to-b to-transparent xl:from-16% xl:to-16% 2xl:from-13% 2xl:to-13%">
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
