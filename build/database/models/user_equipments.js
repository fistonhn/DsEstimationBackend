"use strict";

var _sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserEquipments extends _sequelize.Model {
    static associate(models) {
      // define association here

      // estimations
      UserEquipments.belongsToMany(models.UserEstimations, {
        through: models.UserEstimationLibrary,
        foreignKey: "equipmentId",
        as: "estimations"
      });

      // users
      UserEquipments.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: false
        },
        as: "createdBy"
      });
      // suppliers
      UserEquipments.belongsTo(models.UserSupplier, {
        foreignKey: {
          name: "supplierId",
          allowNull: true
        },
        as: "suppliers"
      });

      // projects
      UserEquipments.belongsTo(models.Projects, {
        foreignKey: {
          name: "projectId",
          allowNull: true
        },
        as: "equipment_project"
      });

      // UserEstimationLibrary
      UserEquipments.hasOne(models.UserEstimationLibrary, {
        foreignKey: "equipmentId",
        as: "equipment_calculation"
      });

      // consumption
      UserEquipments.hasMany(models.UserEquipmentConsumption, {
        foreignKey: {
          name: "equipmentId",
          allowNull: false
        },
        as: "consumed_equipment"
      });
    }
  }
  UserEquipments.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    caveragePerUnit: {
      type: DataTypes.DECIMAL
    },
    hireRatePrice: {
      type: DataTypes.DECIMAL
    },
    number: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    supplierId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    projectId: {
      type: DataTypes.INTEGER
    },
    currency: {
      type: DataTypes.STRING
    },
    brand: {
      type: DataTypes.STRING
    },
    isResource: {
      type: DataTypes.BOOLEAN
    },
    inputQuantity: {
      type: DataTypes.DECIMAL
    },
    inputUnit: {
      type: DataTypes.STRING
    },
    outputQuantity: {
      type: DataTypes.DECIMAL
    },
    outputUnit: {
      type: DataTypes.STRING
    },
    adjustFactor: {
      type: DataTypes.DECIMAL
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
    modelName: "UserEquipments",
    tableName: "user_equipments",
    timestamps: true
  });
  return UserEquipments;
};