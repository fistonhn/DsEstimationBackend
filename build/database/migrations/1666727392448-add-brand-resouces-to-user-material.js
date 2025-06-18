"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_materials", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_materials", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_materials", "brand");
    await queryInterface.removeColumn("user_materials", "isResource");
  }
};