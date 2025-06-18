import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Equipments extends Model {
    static associate(models) {
      // define association here

      // estimations
      Equipments.belongsToMany(models.Estimations, {
        through: models.EstimationLibrary,
        foreignKey: "equipmentId",
        as: "estimations",
      });

      // suppliers
      Equipments.belongsTo(models.Suppliers, {
        foreignKey: {
          name: "supplierId",
          allowNull: true,
        },
        as: "suppliers",
      });

      // users
      Equipments.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true,
        },
        as: "createdBy",
      });

      // templates
      Equipments.belongsTo(models.Templates, {
        foreignKey: {
          name: "templateId",
          allowNull: true,
        },
        as: "template",
      });
    }
  }

  Equipments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      caveragePerUnit: {
        type: DataTypes.DECIMAL,
      },
      hireRatePrice: {
        type: DataTypes.DECIMAL,
      },
      number: {
        type: DataTypes.INTEGER,
      },
      supplierId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      templateId: {
        type: DataTypes.INTEGER,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      currency: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      isResource: {
        type: DataTypes.BOOLEAN,
      },
      inputQuantity: {
        type: DataTypes.DECIMAL,
      },
      inputUnit: {
        type: DataTypes.STRING,
      },
      outputQuantity: {
        type: DataTypes.DECIMAL,
      },
      outputUnit: {
        type: DataTypes.STRING,
      },
      adjustFactor: {
        type: DataTypes.DECIMAL,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Equipments",
      tableName: "equipments",
      timestamps: true,
    }
  );
  return Equipments;
};
