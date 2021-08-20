import axios from "axios"

const getLastMinuteEvents = async () => {
  try {
    const res = await axios.get('/events/lastMinute');
    return res.data;
  } catch {
    return [];
  }
} 

export {
  getLastMinuteEvents
}
