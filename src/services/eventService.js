import axios from '../axios';

const createEvent = async (eventData) => {
  try {
    const res = await axios.post('/events', eventData);

    return res.data;
  } catch(err) {
    return false;
  }
}

const getEvents = async (groupId) => {
  try {
    const res = await axios.get('/events', {
      params: {
        groupId: groupId
      }
    });
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

const deleteEventById = async (id) => {
  try {
    const res = await axios.delete(`/events/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

const updateEvent = async (id, eventData) => {
  try {
    const res = await axios.patch(`/events/${id}`, eventData);
    return res.data;
  } catch (err) {
    return null;
  }
}

export {
  createEvent,
  getEvents,
  getEventById,
  deleteEventById,
  updateEvent,
}
