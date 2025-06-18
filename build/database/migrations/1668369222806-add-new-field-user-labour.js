"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table user_labours
    await queryInterface.addColumn("user_labours", "inputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("user_labours", "inputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_labours", "outputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("user_labours", "outputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_labours", "adjustFactor", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table user_labours
    await queryInterface.removeColumn("user_labours", "inputQuantity");
    await queryInterface.removeColumn("user_labours", "inputUnit");
    await queryInterface.removeColumn("user_labours", "outputQuantity");
    await queryInterface.removeColumn("user_labours", "outputUnit");
    await queryInterface.removeColumn("user_labours", "adjustFactor");
  }
};