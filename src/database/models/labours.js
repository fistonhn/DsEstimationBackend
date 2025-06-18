import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Labours extends Model {
    static associate(models) {
      // associate here

      // users
      Labours.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: true,
        },
        as: "createdBy",
      });

      // estimations
      Labours.belongsToMany(models.Estimations, {
        through: models.EstimationLibrary,
        foreignKey: "labourId",
        as: "estimations",
      });

      // templates
      Labours.belongsTo(models.Templates, {
        foreignKey: {
          name: "templateId",
          allowNull: true,
        },
        as: "template",
      });
    }
  }

  Labours.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
      },
      unit: {
        type: DataTypes.STRING,
      },
      wages: {
        type: DataTypes.DECIMAL,
      },
      caveragePerUnit: {
        type: DataTypes.DECIMAL,
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
      modelName: "Labours",
      tableName: "labours",
      timestamps: true,
    }
  );
  return Labours;
};
