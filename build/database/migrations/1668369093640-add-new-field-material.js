"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table materials
    await queryInterface.addColumn("materials", "inputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("materials", "inputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("materials", "outputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("materials", "outputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("materials", "adjustFactor", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table materials
    await queryInterface.removeColumn("materials", "inputQuantity");
    await queryInterface.removeColumn("materials", "inputUnit");
    await queryInterface.removeColumn("materials", "outputQuantity");
    await queryInterface.removeColumn("materials", "outputUnit");
    await queryInterface.removeColumn("materials", "adjustFactor");
  }
};