"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("labours", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("labours", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("labours", "brand");
    await queryInterface.removeColumn("labours", "isResource");
  }
};