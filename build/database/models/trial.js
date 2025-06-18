"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trial extends _sequelize.Model {
    static associate(models) {
      // Currency
      Trial.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true
        },
        as: "user"
      });
    }
  }
  Trial.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    isTrial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    trialStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    trialEndDate: {
      type: DataTypes.DATE,
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
    modelName: "Trial",
    tableName: "trials",
    timestamps: true
  });
  return Trial;
};