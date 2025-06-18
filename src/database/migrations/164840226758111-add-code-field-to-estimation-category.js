module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add column company to table users
    await queryInterface.addColumn("estimation_categories", "code", {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column company from table estimation_categories
    await queryInterface.removeColumn("estimation_categories", "code");
  },
};
