import sequelize_all from 'sequelize';

import initModels from './models/init-models.js';
import dbconfig from './dbconfig.js';

import insertUser from './dbHandlers/insertUser.js';
import insertEvent from './dbHandlers/insertEvent.js';
import insertUserToEvent from './dbHandlers/insertUserToEvent.js'
import insertGroup from './dbHandlers/insertGroup.js';
import selectUserByEmail from './dbHandlers/selectUserByEmail.js';
import selectUserByName from './dbHandlers/selectUserByName.js';
import selectEventById from './dbHandlers/selectEventById.js';
import selectGroupById from './dbHandlers/selectGroupById.js';
import selectAll from './dbHandlers/selectAll.js';
import selectLastMinuteEvents from './dbHandlers/selectLastMinuteEvents.js';
import selectNextWeekEvents from './dbHandlers/selectNextWeekEvents.js';
import selectEventParticipants from './dbHandlers/selectEventParticipants.js';

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

    const result = await insertUserToEvent(data, models['event_members'], serverConnectionError);

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

export const getEventById = async (id) => {
  try {
    const result = await selectEventById(models['events'], id, serverConnectionError);
    return JSON.parse(result);
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
