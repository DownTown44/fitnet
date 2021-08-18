import axios from '../axios';

const createEvent = async (eventData) => {
  try {
    const res = await axios.post('/events', eventData);
    return res.data.created;
  } catch(err) {
    return false;
  }
}

export {
  createEvent,
}
