import axios from '../axios';

const createEvent = async (eventData) => {
  try {
    const res = await axios.post('/events', eventData);
    return res.data.created;
  } catch(err) {
    return false;
  }
}

const getEventById = async (id) => {
  try {
    const res = await axios.get(`/events/1`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return null;
  }
}

export {
  createEvent,
  getEventById,
}
