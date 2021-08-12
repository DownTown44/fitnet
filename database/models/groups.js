import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class groups extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    group_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Group owner",
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    accessibility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accessibilities',
        key: 'accessibility_id'
      }
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'groups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "group_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "user_id_UNIQUE",
        unique: false,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_Id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_GROUPS_ACCESSIBILITIES_idx",
        using: "BTREE",
        fields: [
          { name: "accessibility_id" },
        ]
      },
    ]
  });
  return groups;
  }
}
