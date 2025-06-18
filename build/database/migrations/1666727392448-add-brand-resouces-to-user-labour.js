"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_labours", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_labours", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_labours", "brand");
    await queryInterface.removeColumn("user_labours", "isResource");
  }
};