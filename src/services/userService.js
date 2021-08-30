import axios from '../axios';

// TODO: RESTful api correctly => events/:id/users;

const getEventUsers = async (eventId) => {
  try {
    const res = await axios.get('/users/eventUsers', {params: { eventId: eventId }});
    return res.data;
  } catch (err) {
    return [];
  }
}

const getEventMember = async (userId, eventId) => {
  try {
    const res = await axios.get(`/events/${eventId}/member`, {params: {userId: userId}});;

    return res.data.isMember;
  } catch (err) {
    console.log(err);

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

const removeUserFromEvent = async (userId, eventId) => {
  try {
    const res = await axios.post(`/events/${eventId}/remove`, { userId: userId });

    return res.data;
  } catch (err) {
    return [];
  }
}

const joinUserToEvent = async (userId, eventId) => {
  try {
    const result = await axios.post(`/events/${eventId}/join`, {userId: userId});

    return result.data;
  } catch (err) {
    return false;
  }
}

const userLeaveEvent = async (userId, eventId) => {
  try {
    const result = await axios.post(`events/${eventId}/leave`, {userId: userId});

    return result.data;
  } catch (err) {
    return false;
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

const getGroupMember = async (userId, groupId) => {
  try {
    const res = await axios.get(`/groups/${groupId}/member`, {params: {userId: userId}});

    return res.data.isMember;
  } catch (err) {
    console.log(err);

  }
}

const inviteUserToGroup= async (userId, groupId) => {
  try {
    const res = await axios.post(`/groups/${groupId}/invite`, { userId: userId });

    return res.data;
  } catch (err) {
    return [];
  }
}

const joinUserToGroup = async (userId, groupId) => {
  try {
    const result = await axios.post(`/groups/${groupId}/join`, {userId: userId});

    return result.data;
  } catch (err) {
    // TODO: Error modal >_< 
  }
}

export {
  getEventUsers,
  getEventMember,
  inviteUserToEvent,
  removeUserFromEvent,
  joinUserToEvent,
  userLeaveEvent,
  getGroupUsers,
  getGroupMember,
  inviteUserToGroup,
  joinUserToGroup,
}
