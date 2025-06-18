"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EstimationCategory extends _sequelize.Model {
    static associate(models) {
      // define association here

      // users
      EstimationCategory.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true
        },
        as: "createdBy"
      });

      // categories
      EstimationCategory.hasMany(models.Estimations, {
        foreignKey: {
          name: "estimationCategoryId",
          allowNull: false
        },
        as: "activities"
      });

      // projects TEMPLATE
      EstimationCategory.belongsTo(models.Templates, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "template"
      });

      // Subcategory
      EstimationCategory.hasMany(models.EstimationSubcategory, {
        foreignKey: {
          name: "mainCategoryId",
          allowNull: false
        },
        as: "subcategory"
      });
    }
  }
  EstimationCategory.init({
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
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    templateId: {
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
    modelName: "EstimationCategory",
    tableName: "estimation_categories",
    timestamps: true
  });
  return EstimationCategory;
};