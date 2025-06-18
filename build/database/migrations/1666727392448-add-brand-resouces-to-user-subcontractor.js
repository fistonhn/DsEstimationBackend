"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_subcontractors", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_subcontractors", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_subcontractors", "brand");
    await queryInterface.removeColumn("user_subcontractors", "isResource");
  }
};