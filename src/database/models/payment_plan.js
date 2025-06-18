import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class PaymentPlan extends Model {
    static associate(models) {}
  }
  PaymentPlan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      interval: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      planId: {
        type: DataTypes.STRING,
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
      modelName: "PaymentPlan",
      tableName: "payment_plans",
      timestamps: true,
    }
  );
  return PaymentPlan;
};
