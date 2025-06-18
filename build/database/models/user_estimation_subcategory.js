"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserEstimationSubcategory extends _sequelize.Model {
    static associate(models) {
      // define association here

      // users
      UserEstimationSubcategory.belongsTo(models.UserEstimationCategory, {
        foreignKey: {
          name: "mainCategoryId",
          allowNull: true
        },
        as: "userMainCategory"
      });
      // users
      UserEstimationSubcategory.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true
        },
        as: "user_subcategory"
      });
    }
  }
  UserEstimationSubcategory.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
    mainCategoryId: {
      type: DataTypes.INTEGER
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    modelName: "UserEstimationSubcategory",
    tableName: "user_estimation_subcategory",
    timestamps: true
  });
  return UserEstimationSubcategory;
};