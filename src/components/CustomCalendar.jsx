import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { getEventDates, getEvents } from '../services/feedService'
import EventCards from './Cards/EventCards/EventCards';

const CustomCalendar = () => {
  // https://github.com/wojtekmaj/react-calendar
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    getEventDates().then((result) => {
      setEventDates(result);
    });
  }, []);

  const onDateChange = (newDate) => {
    setDate(newDate);
    getEvents(moment(newDate).format('YYYY-MM-DD 00:00')).then((result) => {
      setEvents(result);
    });
  }

  return (
    <div className="calendar-menu left">
      <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          if(eventDates.find((x) => x === moment(date).format('YYYY-MM-DD'))){
            return  'event-reminder';
          }
        }}
      />
      <EventCards calendarEvents={true} events={events}/>
    </div>
  );
}

export default CustomCalendar;
