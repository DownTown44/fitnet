import sequelize_all from 'sequelize';
const { Sequelize, Model, DataTypes } = sequelize_all;
import initModels from './models/init-models.js';

import usersData from './seeds/usersData.js';
import rolesData from './seeds/rolesData.js';
import accessibilitiesData from './seeds/accessibilitiesData.js';
import groupsData from './seeds/groupsData.js';
import groupMembersData from './seeds/groupMembersData.js';

const sequelize = new Sequelize('mysql://root:root123@localhost:3306/fitnetdb', {
    define: {
        timestamps: false,
    }
})

const models = initModels(sequelize);

let saveRole = async (d) => {
  await sequelize.sync();
  const data = await models.roles.create(d)
    .catch(e => console.log(e));
};

let saveAccessibility = async (d) => {
  await sequelize.sync();
  const data = await models.accessibilities.create(d)
    .catch(e => console.log(e));
};

let saveUser = async (d) => {
  await sequelize.sync();
  const data = await models.users.create(d)
    .catch(e => console.log(e));
};

let saveGroup = async (d) => {
  await sequelize.sync();
  const data = await models.users.create(d)
    .catch(e => console.log(e));
};

let saveGroupMember = async (d) => {
  await sequelize.sync();
  const data = await models.users.create(d)
    .catch(e => console.log(e));
};

// TODO: Should be synchronous
rolesData.map(e => saveRole(e));
accessibilitiesData.map(e => saveAccessibility(e));
usersData.map(e => saveUser(e));
groupsData.map(e => saveGroup(e));
groupMembersData.map(e => saveGroupMember(e));
    