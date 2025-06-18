module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_materials", "currency", {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_materials", "currency");
  },
};
