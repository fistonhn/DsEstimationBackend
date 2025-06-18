module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_equipments", "brand", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("user_equipments", "isResource", {
      type: Sequelize.BOOLEAN,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_equipments", "brand");
    await queryInterface.removeColumn("user_equipments", "isResource");
  },
};
