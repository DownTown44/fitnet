import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class fields extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    field_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facilities',
        key: 'facility_id'
      }
    },
    picture: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fields',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "field_id" },
        ]
      },
      {
        name: "field_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "field_id" },
        ]
      },
      {
        name: "FK_FIELDS_FACILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return fields;
  }
}
