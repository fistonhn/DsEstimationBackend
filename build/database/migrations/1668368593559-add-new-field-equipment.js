"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table equipments
    await queryInterface.addColumn("equipments", "inputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("equipments", "inputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("equipments", "outputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("equipments", "outputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("equipments", "adjustFactor", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table equipments
    await queryInterface.removeColumn("equipments", "inputQuantity");
    await queryInterface.removeColumn("equipments", "inputUnit");
    await queryInterface.removeColumn("equipments", "outputQuantity");
    await queryInterface.removeColumn("equipments", "outputUnit");
    await queryInterface.removeColumn("equipments", "adjustFactor");
  }
};