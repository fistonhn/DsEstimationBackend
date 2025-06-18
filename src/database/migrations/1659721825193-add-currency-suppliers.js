module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("suppliers", "currency", {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("suppliers", "currency");
  },
};
