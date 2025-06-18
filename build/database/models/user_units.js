"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserUnits extends _sequelize.Model {
    static associate(models) {
      UserUnits.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: false
        },
        as: "createBy"
      });
    }
  }
  UserUnits.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: "UserUnits",
    tableName: "user_units",
    timestamps: true
  });
  return UserUnits;
};