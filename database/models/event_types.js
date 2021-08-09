import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class event_types extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "type_name_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'event_types',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "type_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "type_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_name" },
        ]
      },
    ]
  });
  return event_types;
  }
}
