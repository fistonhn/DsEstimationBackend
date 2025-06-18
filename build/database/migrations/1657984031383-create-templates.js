"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("templates", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ["not started", "on progress", "suspended", "canceled", "completed"],
        defaultValue: "not started"
      },
      currencyCode: {
        type: Sequelize.STRING,
        defaultValue: "RWF"
      },
      currencyValue: {
        type: Sequelize.DECIMAL,
        defaultValue: "1.00"
      },
      vat: {
        type: Sequelize.DECIMAL
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("templates");
  }
};