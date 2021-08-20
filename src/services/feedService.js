import axios from '../axios';
import moment from 'moment';

const getLastMinuteEvents = async () => {
  try {
    // BUG: Date bug
    const now = new Date();
    const dateString = moment(now).format('YYYY-MM-DD HH:mm');
    console.log(dateString);
    const res = await axios.get('/events/lastMinute', { params: { date: dateString } });

    return res.data;
  } catch {
    return [];
  }
} 

export {
  getLastMinuteEvents
}
