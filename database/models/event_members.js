import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class event_members extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      event_member_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id'
        }
      },
    },
    { sequelize,
      tableName: 'event_members',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "event_member_id" },
          ]
        },
        {
          name: "event_member_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "event_member_id" },
          ]
        },
        {
          name: "FK_EVENTMEMBERS_USERS_idx",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "FK_EVENTMEMBERS_EVENTS_idx",
          using: "BTREE",
          fields: [
            { name: "event_id" },
          ]
        },
      ]
    }
  );
  return event_members;
  }
}
  