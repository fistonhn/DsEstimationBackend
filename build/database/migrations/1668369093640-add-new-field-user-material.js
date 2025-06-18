"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table user_materials
    await queryInterface.addColumn("user_materials", "inputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("user_materials", "inputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_materials", "outputQuantity", {
      type: Sequelize.DECIMAL
    });
    await queryInterface.addColumn("user_materials", "outputUnit", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("user_materials", "adjustFactor", {
      type: Sequelize.DECIMAL
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table user_materials
    await queryInterface.removeColumn("user_materials", "inputQuantity");
    await queryInterface.removeColumn("user_materials", "inputUnit");
    await queryInterface.removeColumn("user_materials", "outputQuantity");
    await queryInterface.removeColumn("user_materials", "outputUnit");
    await queryInterface.removeColumn("user_materials", "adjustFactor");
  }
};