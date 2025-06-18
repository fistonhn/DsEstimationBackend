"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add column company to table users
    await queryInterface.addColumn("user_estimation_categories", "code", {
      type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column company from table user_estimation_categories
    await queryInterface.removeColumn("user_estimation_categories", "code");
  }
};