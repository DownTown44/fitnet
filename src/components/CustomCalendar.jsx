import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { getEvents } from '../services/feedService'
import EventCards from './Cards/EventCards/EventCards';

const CustomCalendar = () => {
  // TODO: when server is ready, we need to render notifications on the days and 
  // add onclick to them
  // TODO: Calendar needs styling
  // https://github.com/wojtekmaj/react-calendar
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

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
      />
      <EventCards calendarEvents={true} events={events}/>
    </div>
  );
}

export default CustomCalendar;
