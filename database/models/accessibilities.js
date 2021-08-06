import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class accessibilities extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    accessibility_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    accessibility_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "accessibility_name_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'accessibilities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accessibility_id" },
        ]
      },
      {
        name: "accessibility_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accessibility_name" },
        ]
      },
      {
        name: "accessibility_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accessibility_id" },
        ]
      },
    ]
  });
  return accessibilities;
  }
}
