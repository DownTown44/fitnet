import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class opening_hours extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    opening_hour_id: {
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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    opening: {
      type: DataTypes.TIME,
      allowNull: false
    },
    closing: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'opening_hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "opening_hour_id" },
        ]
      },
      {
        name: "idopening_hour_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "opening_hour_id" },
        ]
      },
      {
        name: "FK_OPENINGHOURS_FACILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return opening_hours;
  }
}
