import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class events extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    event_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    accessibility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accessibilities',
        key: 'accessibility_id'
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Sima event: 1\nEdzes: 2\nRendezveny: 3",
      references: {
        model: 'event_types',
        key: 'type_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    },
    owner_type: {
      type: DataTypes.ENUM('user','group','facility'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    min_participant: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max_participant: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    repeat: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'events',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "event_id" },
        ]
      },
      {
        name: "event_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "event_id" },
        ]
      },
      {
        name: "FK_EVENTS_USERS_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_EVENTS_GROUPS_idx",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "FK_EVENTS_ACCESSIBILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "accessibility_id" },
        ]
      },
      {
        name: "FK_EVENTS_EVENTTYPES_idx",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
  return events;
  }
}
