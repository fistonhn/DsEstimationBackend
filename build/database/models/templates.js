"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Templates extends _sequelize.Model {
    static associate(models) {
      Templates.hasMany(models.EstimationCategory, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "workSpecification"
      });
      Templates.hasMany(models.EstimationSubcategory, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "subcategories"
      });
      Templates.hasOne(models.EstimationLibrary, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "estimation"
      });

      // Templates -> supplier
      Templates.hasMany(models.Suppliers, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "suppliers"
      });

      // UserEstimations
      Templates.hasMany(models.Estimations, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "estimations"
      });

      // UserLabours
      Templates.hasMany(models.Labours, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "template_labours"
      });
      // UserSubContractors
      Templates.hasMany(models.SubContractors, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "template_subcontractors"
      });

      // UserEquipments
      Templates.hasMany(models.Equipments, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "template_equipments"
      });

      // UserMaterials
      Templates.hasMany(models.Materials, {
        foreignKey: {
          name: "templateId",
          allowNull: true
        },
        as: "template_materials"
      });
    }
  }
  Templates.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ["not started", "on progress", "suspended", "canceled", "completed"],
      defaultValue: "not started"
    },
    currencyCode: {
      type: DataTypes.STRING,
      defaultValue: "RWF"
    },
    currencyValue: {
      type: DataTypes.DECIMAL,
      defaultValue: "1.00"
    },
    vat: {
      type: DataTypes.DECIMAL
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    category: {
      type: DataTypes.STRING
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
    modelName: "Templates",
    tableName: "templates",
    timestamps: false
  });
  return Templates;
};