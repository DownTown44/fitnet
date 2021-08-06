import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class group_tags extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    group_tag_id: {
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
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_tag_id" },
        ]
      },
      {
        name: "group_tag_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_tag_id" },
        ]
      },
      {
        name: "FK_GROUPTAGS_TAGS_idx",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
      {
        name: "FK_GROUPTAGS_GROUPS_idx",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
  return group_tags;
  }
}
