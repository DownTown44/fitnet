import sequelize_all from 'sequelize';
import mysql from 'mysql';
const { Sequelize, Model, DataTypes } = sequelize_all;

import initModels from './models/init-models.js';
import dbconfig from './dbconfig.js';

import { 
  usersData,
  rolesData,
  accessibilitiesData,
  groupMembersData,
  eventMembersData,
  groupsData,
  tagsData,
  groupTagsData,
  facilitiesData,
  facilityTagsData,
  facilityPicturesData,
  reviewsData,
  openingHoursData,
  fieldsData,
  eventTypesData,
  eventsData,
  bookingsData
 } from './seeds/index.js';

// Destructuring config
const { host, port, user, password, database } = dbconfig;

// Creating database
let initDatabase = async () => {
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  connection.end();
};

initDatabase();

// Estabilishing connection to database
const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`, {
  define: {
      timestamps: false,
  }
});

const models = initModels(sequelize);

// Creates a new record in the db
let saveToDB = async (d, type) => {
  await sequelize.sync();
  const data = await models[type].bulkCreate(d)
    .catch(e => console.log(e));

  return data;
};

// Reading data from seeds and creating new records
let seedDatabase = async () => {
  await saveToDB(rolesData, 'roles');
  await saveToDB(usersData, 'users');
  await saveToDB(accessibilitiesData, 'accessibilities');
  await saveToDB(groupsData, 'groups');
  await saveToDB(tagsData, 'tags');
  await saveToDB(groupTagsData, 'group_tags');
  await saveToDB(groupMembersData, 'group_members');
  await saveToDB(facilitiesData, 'facilities');
  await saveToDB(facilityTagsData, 'facility_tags');
  await saveToDB(facilityPicturesData, 'facility_pictures');
  await saveToDB(fieldsData, 'fields');
  await saveToDB(eventTypesData, 'event_types');
  await saveToDB(eventsData, 'events');
  await saveToDB(eventMembersData, 'event_members');
  await saveToDB(reviewsData, 'reviews');
  await saveToDB(bookingsData, 'bookings');
  await saveToDB(openingHoursData, 'opening_hours');
};
    
seedDatabase();
