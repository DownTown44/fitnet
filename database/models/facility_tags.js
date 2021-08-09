import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facility_tags extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    facility_tag_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'tag_id'
      }
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facilities',
        key: 'facility_id'
      }
    }
  }, {
    sequelize,
    tableName: 'facility_tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_tag_id" },
        ]
      },
      {
        name: "facility_tag_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_tag_id" },
        ]
      },
      {
        name: "FK_FACILITYTAGS_TAGS_idx",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
      {
        name: "FK_FACILITYTAGS_FACILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return facility_tags;
  }
}
