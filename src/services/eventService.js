import axios from '../axios';

const createEvent = async (eventData) => {
  try {
    const res = await axios.post('/events', eventData);

    return res.data;
  } catch(err) {
    return false;
  }
}

const getEvents = async () => {
  try {
    const res = await axios.get('/events');
    return res.data;
  } catch (err) {
    return [];
  }
}

const getEventById = async (id) => {
  try {
    const res = await axios.get(`/events/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

export {
  createEvent,
  getEvents,
  getEventById,
}
