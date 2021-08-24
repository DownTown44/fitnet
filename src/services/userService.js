import axios from '../axios';

const getEventUsers = async (eventId) => {
  try {
    const res = await axios.get('/users/eventUsers', {params: { eventId: eventId }});
    return res.data;
  } catch (err) {
    return [];
  }
}

const inviteUserToEvent = async (userId, eventId) => {
  try {
    const res = await axios.post(`/events/${eventId}/invite`, { userId: userId });

    return res.data;
  } catch (err) {
    return [];
  }
}

const getGroupUsers = async (groupId) => {
  try {
    const res = await axios.get('/users/groupUsers', {params: {groupId: groupId}});
    return res.data;
  } catch (err) {
    return [];
  }
}

export {
  getEventUsers,
  inviteUserToEvent,
  getGroupUsers,
}
