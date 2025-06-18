"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add column adminId to table projects
    await queryInterface.changeColumn("user_materials", "quantity", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table projects
    await queryInterface.changeColumn("user_materials", "quantity", {
      type: Sequelize.INTEGER
    });
  }
};