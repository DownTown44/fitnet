import axios from '../axios';

// EVENTS

const getEventUsers = async (eventId) => {
  try {
    const res = await axios.get(`/events/${eventId}/users`);
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

const joinUserToEvent = async (userId, eventId) => {
  try {
    const result = await axios.post(`/events/${eventId}/join`, {userId: userId});

    return result.data;
  } catch (err) {
    return false;
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

const userLeaveEvent = async (userId, eventId) => {
  try {
    const result = await axios.post(`/events/${eventId}/leave`, {userId: userId});

    return result.data;
  } catch (err) {
    return false;
  }
}

// GROUPS

const getGroupUsers = async (groupId) => {
  try {
    const res = await axios.get(`/groups/${groupId}/users`);
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
    return [];
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
    return false;
    // TODO: Error modal >_< 
  }
}

const removeUserFromGroup = async (userId, groupId) => {
  try {
    const res = await axios.post(`/groups/${groupId}/remove`, { userId: userId });

    return res.data;
  } catch (err) {
    return [];
  }
}

const userLeaveGroup = async (userId, groupId) => {
  try {
    const result = await axios.post(`/groups/${groupId}/leave`, {userId: userId});

    return result.data;
  } catch (err) {
    return false;
  }
}


export {
  getEventUsers,
  getEventMember,
  inviteUserToEvent,
  joinUserToEvent,
  removeUserFromEvent,
  userLeaveEvent,
  getGroupUsers,
  getGroupMember,
  inviteUserToGroup,
  joinUserToGroup,
  removeUserFromGroup,
  userLeaveGroup
}
