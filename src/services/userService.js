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
    const res = await axios.get('/users/member', {
      params: {
        userId: userId,
        groupId: groupId
      }
    });

    return res.data.isMember;
  } catch (err) {
    console.log(err);

  }
}

const joinUserToGroup = async (userId, groupId) => {
  try {
    await axios.post(`/groups/${groupId}/join`, {userId: userId});
  } catch (err) {
    // TODO: Error modal >_< 
  }
}

export {
  getEventUsers,
  inviteUserToEvent,
  removeUserFromEvent,
  getGroupUsers,
  getGroupMember,
  joinUserToGroup,
}
