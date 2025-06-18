"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccessLevel extends _sequelize.Model {
    static associate(models) {
      // define association here
      AccessLevel.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true
        },
        as: "user_AccessLevel"
      });
      AccessLevel.belongsTo(models.Role, {
        foreignKey: {
          name: "roleId",
          allowNull: true
        },
        as: "role"
      });
    }
  }
  AccessLevel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // array of AccessLevel
    userId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    accessProjectIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
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
    modelName: "AccessLevel",
    tableName: "accessLevel",
    timestamps: true
  });
  return AccessLevel;
};