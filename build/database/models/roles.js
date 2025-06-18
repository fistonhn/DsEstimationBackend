"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends _sequelize.Model {
    static associate(models) {
      // define association here
      Role.hasOne(models.AccessLevel, {
        foreignKey: {
          name: "roleId",
          allowNull: true
        },
        as: "access_permissions"
      });
      Role.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true
        },
        as: "user"
      });
    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["read"]
    },
    userId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true
  });
  return Role;
};