import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facility_pictures extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    facility_picture_id: {
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
    }
  }, {
    sequelize,
    tableName: 'facility_pictures',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_picture_id" },
        ]
      },
      {
        name: "facility_picture_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_picture_id" },
        ]
      },
      {
        name: "FK_FACILITYPICTURES_FACILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return facility_pictures;
  }
}
