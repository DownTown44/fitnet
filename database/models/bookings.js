import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bookings extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    booking_id: {
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
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'facility_id'
      }
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fields',
        key: 'field_id'
      }
    },
    notes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "booking_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "FK_BOOKINGS_USERS_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_BOOKINGS_GROUPS_idx",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "FK_BOOKINGS_FIELDS_idx",
        using: "BTREE",
        fields: [
          { name: "field_id" },
        ]
      },
      {
        name: "FK_BOOKINGS_FACILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return bookings;
  }
}
