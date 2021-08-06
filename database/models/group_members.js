import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class group_members extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    group_member_id: {
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
    groupd_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_members',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_member_id" },
        ]
      },
      {
        name: "group_member_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_member_id" },
        ]
      },
      {
        name: "FK_GROUPMEMBERS_USERS_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_GROUPMEMBERS_GROUPS_idx",
        using: "BTREE",
        fields: [
          { name: "groupd_id" },
        ]
      },
    ]
  });
  return group_members;
  }
}
