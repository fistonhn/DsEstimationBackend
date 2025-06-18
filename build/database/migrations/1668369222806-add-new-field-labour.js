"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table labours
    await queryInterface.addColumn("labours", "inputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("labours", "inputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("labours", "outputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("labours", "outputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("labours", "adjustFactor", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table labours
    await queryInterface.removeColumn("labours", "inputQuantity");
    await queryInterface.removeColumn("labours", "inputUnit");
    await queryInterface.removeColumn("labours", "outputQuantity");
    await queryInterface.removeColumn("labours", "outputUnit");
    await queryInterface.removeColumn("labours", "adjustFactor");
  }
};