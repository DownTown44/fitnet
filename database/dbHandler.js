import sequelize_all from 'sequelize';

import initModels from './models/init-models.js';
import dbconfig from './dbconfig.js';

import insertUser from './dbHandlers/insertUser.js';
import insertEvent from './dbHandlers/insertEvent.js';
import deleteUserFromEvent from './dbHandlers/deleteUserFromEvent.js';
import deleteUserFromGroup from './dbHandlers/deleteUserFromGroup.js';
import insertGroup from './dbHandlers/insertGroup.js';
import selectUserByEmail from './dbHandlers/selectUserByEmail.js';
import selectUserByName from './dbHandlers/selectUserByName.js';
import selectEventById from './dbHandlers/selectEventById.js';
import selectGroupById from './dbHandlers/selectGroupById.js';
import selectAll from './dbHandlers/selectAll.js';
import selectLastMinuteEvents from './dbHandlers/selectLastMinuteEvents.js';
import selectNextWeekEvents from './dbHandlers/selectNextWeekEvents.js';
import selectFacilityById from './dbHandlers/selectFacilityById.js';
import selectFieldsByFacilityId from './dbHandlers/selectFieldsByFacilityId.js';
import selectPictureByFacilityId from './dbHandlers/selectPictureByFacilityId.js';
import selectEventParticipants from './dbHandlers/selectEventParticipants.js';
import selectGroupParticipants from './dbHandlers/selectGroupParticipants.js';
import selectAllWithAccess from './dbHandlers/selectAllWithAccess.js';
import selectFromGroupMembers from './dbHandlers/selectFromGroupMembers.js';
import selectFromEventMembers from './dbHandlers/selectFromEventMembers.js';
import deleteGroup from './dbHandlers/deleteGroup.js';
import deleteEvent from './dbHandlers/deleteEvent.js';
import updateEventDBH from './dbHandlers/updateEventDBH.js'
import updateGroupDBH from './dbHandlers/updateGroupDBH.js'
import selectGroups from './dbHandlers/selectGroups.js';
import selectGroupMemberByGroupId from './dbHandlers/selectGroupMemberByGroupId.js';
import group_members from './models/group_members.js';

const { Sequelize } = sequelize_all;
const { host, port, user, password, database } = dbconfig;

const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`, {
  define: {
      timestamps: false,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
});

const models = initModels(sequelize);

// Error messages
const serverConnectionError = 'Server connection is broken';

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

// Data insertion
// TODO: We need to validate the incoming data (ex. so users cant create events on another users id)

// Data insertion
export const createEvent = async (data) => {
  try {
    const result = await insertEvent(data, models['events'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const inviteUserToEvent = async (eventId, body) => {
  try {
    const data = {
      event_id: eventId,
      user_id: body.user_id
    };

    const result = await insertUser(data, models['event_members'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const joinUserIntoEvent = async (eventId, userId) => {
  try {
    const data = { 
      event_id: eventId,
      user_id: userId 
    };
    const result = await insertUser(data, models['event_members'], serverConnectionError);

    return result;
  } catch (err) {
    console.log(err);
  }
}

export const removeUserFromEvent = async (eventId, userId) => {
  try {
    const data = {
      event_id: eventId,
      user_id: userId
    };

    const result = await deleteUserFromEvent(data, models['event_members'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const createGroup = async (data) => {
  try {
    const result = await insertGroup(data, models['groups'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const registerUser = async (data) => {
  try {
    await insertUser(data, models['users'], serverConnectionError);
  } catch(err) {
    console.log(err);
  }
}

// TODO: invite and join are the same, put them into one
export const inviteUserToGroup = async (groupId, body) => {
  try {
    const data = {
      group_id: groupId,
      user_id: body.user_id
    };

    const result = await insertUser(data, models['group_members'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const joinUserIntoGroup = async (groupId, userId) => {
  try {
    const data = { group_id: groupId, user_id: userId };
    const result = await insertUser(data, models['group_members'], serverConnectionError);

    return result;
  } catch (err) {
    console.log(err);
  }
}

// Data deletion

export const removeUserFromGroup = async (groupId, userId) => {
  try {
    const data = {
      group_id: groupId,
      user_id: userId
    };

    const result = await deleteUserFromGroup(data, models['group_members'], serverConnectionError);

    return result;
  } catch(err) {
    console.log(err);
  }
}

export const deleteGroupById = async (data) => {
  try {
    const result = await deleteGroup(data, models['groups'], serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
  }
}

export const deleteEventById = async (data) => {
  try {
    const result = await deleteEvent(data, models['events'], serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
  }
}

// Update data

export const updateEvent = async (data) => {
  try {
    const result = await updateEventDBH(models['events'], data);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
  }
}

export const updateGroup = async (data) => {
  try {
    const result = await updateGroupDBH(models['groups'], data);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
  }
}

// Data selection

export const getUserByEmail = async (data) => {
  try {
    const result = await selectUserByEmail(models['users'], data.email, serverConnectionError);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getUsersByName = async (searchString) => {
  try {
    const result = await selectUserByName(models['users'], searchString, serverConnectionError);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getEverythingOf = async (model) => {
  try {
    const result = await selectAll(models[model], serverConnectionError);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getEverythingWithAccessOf = async (model) => {
  try {
    const result = await selectAllWithAccess(models[model], serverConnectionError);
    return JSON.parse(result);
  } catch(err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getGroupsWithEverything = async () => {
  try {
    const result = await selectGroups(models['groups'], serverConnectionError);

    return JSON.parse(result);
  } catch(err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getEventById = async (id) => {
  try {
    const result = await selectEventById(models['events'], id, serverConnectionError);
    const resultObj = JSON.parse(result);

    const startDate = resultObj[0].start_date;
    const endDate = resultObj[0].end_date;

    resultObj[0].start_date = startDate.substr(0, startDate.length - 1);
    resultObj[0].end_date = endDate.substr(0, endDate.length - 1);

    return resultObj;
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getGroupById = async (id) => {
  try {
    const result = await selectGroupById(models['groups'], id, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getLastMinuteEvents = async (date) => {
  try {
    const result = await selectLastMinuteEvents(models['events'], date, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getNextWeekEvents = async (date) => {
  try {
    const result = await selectNextWeekEvents(models['events'], date, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getEventParticipants = async (eventId) => {
  try {
    const result = await selectEventParticipants(models['users'], eventId, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getGroupParticipants = async (groupId) => {
  try {
    const result = await selectGroupParticipants(models['users'], groupId, serverConnectionError);

    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getGroupMemberByGroupId = async (groupId) => {
  try {
    const result = await selectGroupMemberByGroupId(models['group_members'], groupId, serverConnectionError);
    
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const userIsMemberOfGroup = async (groupId, userId) => {
  try {
    const data = {
      group_id: groupId,
      user_id: userId
    }
    const result = await selectFromGroupMembers(models['group_members'], data, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const userIsMemberOfEvent = async (eventId, userId) => {
  try {
    const data = {
      event_id: eventId,
      user_id: userId
    }
    const result = await selectFromEventMembers(models['event_members'], data, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}

export const getFacilityById = async (id) => {
  try {
    const facilities = await selectFacilityById(models['facilities'], id, serverConnectionError);
    const fields = await selectFieldsByFacilityId(models['fields'], id, serverConnectionError);
    const pictures = await selectPictureByFacilityId(models['facility_pictures'], id, serverConnectionError);

    const result = JSON.parse(facilities)[0];
    result.fields = JSON.parse(fields);
    result.pictures = JSON.parse(pictures);

    return result;
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}
