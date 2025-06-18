"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("sub_contractors", "brand", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("sub_contractors", "isResource", {
      type: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("sub_contractors", "brand");
    await queryInterface.removeColumn("sub_contractors", "isResource");
  }
};