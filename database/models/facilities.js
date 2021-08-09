import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facilities extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    facility_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "phone_number_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    avg_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facilities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
      {
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "phone_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "facility_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
      {
        name: "FK_FACILITIES_USERS_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return facilities;
  }
}
