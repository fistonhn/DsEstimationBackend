module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add column adminId to table projects
    await queryInterface.addColumn("projects", "currencyCode", {
      type: Sequelize.STRING,
      defaultValue: "RWF",
    });
    await queryInterface.addColumn("projects", "currencyValue", {
      type: Sequelize.DECIMAL,
      defaultValue: "1.00",
    });
    await queryInterface.addColumn("projects", "vat", {
      type: Sequelize.DECIMAL,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table projects
    await queryInterface.removeColumn("projects", "currencyCode");
    await queryInterface.removeColumn("projects", "currencyValue");
    await queryInterface.removeColumn("projects", "vat");
  },
};
