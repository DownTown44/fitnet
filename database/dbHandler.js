import sequelize_all from 'sequelize';

import initModels from './models/init-models.js';
import dbconfig from './dbconfig.js';

import insertUser from './dbHandlers/insertUser.js';
import insertEvent from './dbHandlers/insertEvent.js';
import insertGroup from './dbHandlers/insertGroup.js';
import selectUserByEmail from './dbHandlers/selectUserByEmail.js';
import selectEventById from './dbHandlers/selectEventById.js';
import selectAll from './dbHandlers/selectAll.js';
import selectLastMinuteEvents from './dbHandlers/selectLastMinuteEvents.js';

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

// TODO: We need a function to check if the db connection is good
// Data insertion
// TODO: We need to validate the incoming data (ex. so users cent create events on another users id)

export const createEvent = async (data) => {
  try {
    await insertEvent(data, models['events'], serverConnectionError);
  } catch(err) {
    console.log(err);
  }
}

export const createGroup = async (data) => {
  try {
    const result = await insertGroup(data, models['groups'], serverConnectionError);
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

export const getLastMinuteEvents = async (date) => {
  try {
    const result = await selectLastMinuteEvents(models['events'], date, serverConnectionError);
    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    throw serverConnectionError;
  }
}
