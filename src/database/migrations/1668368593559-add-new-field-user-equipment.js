module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add inputQuantity, inputUnit, outputQuantity, outputUnit, adjustFactor to table user_equipments
    await queryInterface.addColumn("user_equipments", "inputQuantity", {
      type: Sequelize.DECIMAL,
    });
    await queryInterface.addColumn("user_equipments", "inputUnit", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("user_equipments", "outputQuantity", {
      type: Sequelize.DECIMAL,
    });
    await queryInterface.addColumn("user_equipments", "outputUnit", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("user_equipments", "adjustFactor", {
      type: Sequelize.DECIMAL,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table user_equipments
    await queryInterface.removeColumn("user_equipments", "inputQuantity");
    await queryInterface.removeColumn("user_equipments", "inputUnit");
    await queryInterface.removeColumn("user_equipments", "outputQuantity");
    await queryInterface.removeColumn("user_equipments", "outputUnit");
    await queryInterface.removeColumn("user_equipments", "adjustFactor");
  },
};
