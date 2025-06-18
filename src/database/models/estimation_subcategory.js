import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class EstimationSubcategory extends Model {
    static associate(models) {
      // category

      EstimationSubcategory.belongsTo(models.EstimationCategory, {
        foreignKey: {
          name: "mainCategoryId",
          allowNull: false,
        },
        as: "defaultmain_category",
      });
    }
  }

  EstimationSubcategory.init(
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
      code: {
        type: DataTypes.STRING,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      mainCategoryId: {
        type: DataTypes.INTEGER,
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
      modelName: "EstimationSubcategory",
      tableName: "estimation_subcategory",
      timestamps: true,
    }
  );

  return EstimationSubcategory;
};
