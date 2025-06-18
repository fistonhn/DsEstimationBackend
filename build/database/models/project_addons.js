"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectAddons extends _sequelize.Model {
    static associate(models) {
      // project
      ProjectAddons.belongsTo(models.Projects, {
        foreignKey: {
          name: "projectId",
          allowNull: true
        },
        as: "project_addons"
      });
    }
  }
  ProjectAddons.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reasons: {
      type: DataTypes.STRING
    },
    appliedTo: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.DECIMAL
    },
    projectId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: "ProjectAddons",
    tableName: "project_addons",
    timestamps: false
  });
  return ProjectAddons;
};