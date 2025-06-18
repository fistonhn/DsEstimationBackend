module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_equipments", "currency", {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_equipments", "currency");
  },
};
