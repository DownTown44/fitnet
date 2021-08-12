import sequelize_all from 'sequelize';
const { Sequelize } = sequelize_all;

import initModels from './models/init-models.js';
import dbconfig from './dbconfig.js';

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

export const createGroups = async (data) => {
  try {
    const insertObject = await models['groups'].build(data);
    const result = await insertObject.save();

    return result;
  } catch (error) {
    console.log(error);
    throw "Server connection is broken";
  }
}
