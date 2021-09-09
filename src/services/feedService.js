import axios from '../axios';
import moment from 'moment';

const getLastMinuteEvents = async () => {
  try {
    const now = new Date();
    const dateString = moment(now).format('YYYY-MM-DD HH:mm');
    const res = await axios.get('/events/lastMinute', { params: { date: dateString } });

    return res.data;
  } catch (err) {
    return [];
  }
} 

const getNextWeekEvents = async () => {
  try {
    const now = new Date();
    const dateString = moment(now).format('YYYY-MM-DD HH:mm');
    const res = await axios.get('/events/nextWeek', { params: { date: dateString } });

    return res.data;
  } catch (err) {
    return [];
  }
}

const getEvents = async (date) => {
  try {
    const res = await axios.get('/events/actual', {params: {date: date}});

    return res.data;
  } catch (err) {
    return [];
  }
}

const getEventDates = async () => {
  try {
    const res = await axios.get('/events/dates');

    return res.data;
  } catch (err) {
    return [];
  }
}

export {
  getLastMinuteEvents,
  getNextWeekEvents,
  getEvents,
  getEventDates,
}
