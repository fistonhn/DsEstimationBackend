"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("equipments", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("equipments", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("equipments", "brand");
    await queryInterface.removeColumn("equipments", "isResource");
  }
};