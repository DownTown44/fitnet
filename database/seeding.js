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
  groupsData
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
  await saveToDB(accessibilitiesData, 'accessibilities');
  await saveToDB(usersData, 'users');
  await saveToDB(groupsData, 'groups');
  await saveToDB(groupMembersData, 'group_members');
};
    
seedDatabase();
