import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _accessibilities from  "./accessibilities.js";
import _bookings from  "./bookings.js";
import _event_types from  "./event_types.js";
import _events from  "./events.js";
import _facilities from  "./facilities.js";
import _facility_pictures from  "./facility_pictures.js";
import _facility_tags from  "./facility_tags.js";
import _fields from  "./fields.js";
import _group_members from  "./group_members.js";
import _group_tags from  "./group_tags.js";
import _groups from  "./groups.js";
import _opening_hours from  "./opening_hours.js";
import _reviews from  "./reviews.js";
import _roles from  "./roles.js";
import _tags from  "./tags.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  var accessibilities = _accessibilities.init(sequelize, DataTypes);
  var bookings = _bookings.init(sequelize, DataTypes);
  var event_types = _event_types.init(sequelize, DataTypes);
  var events = _events.init(sequelize, DataTypes);
  var facilities = _facilities.init(sequelize, DataTypes);
  var facility_pictures = _facility_pictures.init(sequelize, DataTypes);
  var facility_tags = _facility_tags.init(sequelize, DataTypes);
  var fields = _fields.init(sequelize, DataTypes);
  var group_members = _group_members.init(sequelize, DataTypes);
  var group_tags = _group_tags.init(sequelize, DataTypes);
  var groups = _groups.init(sequelize, DataTypes);
  var opening_hours = _opening_hours.init(sequelize, DataTypes);
  var reviews = _reviews.init(sequelize, DataTypes);
  var roles = _roles.init(sequelize, DataTypes);
  var tags = _tags.init(sequelize, DataTypes);
  var users = _users.init(sequelize, DataTypes);

  events.belongsTo(accessibilities, { as: "accessibility", foreignKey: "accessibility_id"});
  accessibilities.hasMany(events, { as: "events", foreignKey: "accessibility_id"});
  groups.belongsTo(accessibilities, { as: "accessibility", foreignKey: "accessibility_id"});
  accessibilities.hasMany(groups, { as: "groups", foreignKey: "accessibility_id"});
  events.belongsTo(event_types, { as: "type", foreignKey: "type_id"});
  event_types.hasMany(events, { as: "events", foreignKey: "type_id"});
  bookings.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(bookings, { as: "bookings", foreignKey: "facility_id"});
  facility_pictures.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(facility_pictures, { as: "facility_pictures", foreignKey: "facility_id"});
  facility_tags.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(facility_tags, { as: "facility_tags", foreignKey: "facility_id"});
  fields.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(fields, { as: "fields", foreignKey: "facility_id"});
  opening_hours.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(opening_hours, { as: "opening_hours", foreignKey: "facility_id"});
  reviews.belongsTo(facilities, { as: "facility", foreignKey: "facility_id"});
  facilities.hasMany(reviews, { as: "reviews", foreignKey: "facility_id"});
  bookings.belongsTo(fields, { as: "field", foreignKey: "field_id"});
  fields.hasMany(bookings, { as: "bookings", foreignKey: "field_id"});
  bookings.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(bookings, { as: "bookings", foreignKey: "group_id"});
  group_members.belongsTo(groups, { as: "groupd", foreignKey: "groupd_id"});
  groups.hasMany(group_members, { as: "group_members", foreignKey: "groupd_id"});
  group_tags.belongsTo(groups, { as: "group", foreignKey: "group_id"});
  groups.hasMany(group_tags, { as: "group_tags", foreignKey: "group_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  facility_tags.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(facility_tags, { as: "facility_tags", foreignKey: "tag_id"});
  group_tags.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(group_tags, { as: "group_tags", foreignKey: "tag_id"});
  bookings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(bookings, { as: "bookings", foreignKey: "user_id"});
  events.belongsTo(users, { as: "owner", foreignKey: "owner_id"});
  users.hasMany(events, { as: "events", foreignKey: "owner_id"});
  facilities.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(facilities, { as: "facilities", foreignKey: "user_id"});
  group_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(group_members, { as: "group_members", foreignKey: "user_id"});
  groups.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(groups, { as: "group", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});

  return {
    accessibilities,
    bookings,
    event_types,
    events,
    facilities,
    facility_pictures,
    facility_tags,
    fields,
    group_members,
    group_tags,
    groups,
    opening_hours,
    reviews,
    roles,
    tags,
    users,
  };
}
