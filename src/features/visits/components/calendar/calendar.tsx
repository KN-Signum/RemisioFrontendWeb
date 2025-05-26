import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { useTranslation } from 'react-i18next';
import { GetVisitDto, NewVisitDialog } from '../..';
import { CalendarStyle } from '.';
import { DateSelectArg, DatesSetArg } from '@fullcalendar/core/index.js';
import { useState } from 'react';

export interface CalendarProps {
  visits: GetVisitDto[];
}

export const Calendar = (props: CalendarProps) => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const { visits } = props;

  const events = visits.map((visit: GetVisitDto) => ({
    title: visit.name,
    start: visit.time_start,
    end: visit.time_end,
    id: visit.id,
    draggable: false,
  }));

  const handleDatesSet = (arg: DatesSetArg) => {
    setCurrentView(arg.view.type);
  };

  const handleDateClick = (arg: DateClickArg) => {
    if (currentView === 'dayGridMonth') {
      arg.view.calendar.changeView('timeGridWeek', arg.dateStr);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (currentView === 'timeGridWeek') {
      setIsDialogOpen(true);
      setSelectedStartDate(selectInfo.start);
      setSelectedEndDate(selectInfo.end);
      return;
    }
  };

  return (
    <div className="from-secondary h-full w-full rounded-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={1}
        height={'100%'}
        locale={t('language') === 'pl' ? plLocale : enLocale}
        timeZone="pl"
        headerToolbar={{
          left: 'prev, today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek, next',
        }}
        events={events}
        dateClick={handleDateClick}
        select={handleDateSelect}
        datesSet={handleDatesSet}
        selectable={currentView === 'timeGridWeek'}
      />
      <CalendarStyle />
      {isDialogOpen && (
        <NewVisitDialog
          onClose={() => {
            setIsDialogOpen(false);
          }}
          startDate={selectedStartDate!}
          endDate={selectedEndDate!}
        />
      )}
    </div>
  );
};
