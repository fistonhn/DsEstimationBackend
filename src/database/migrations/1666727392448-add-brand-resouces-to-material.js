module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("materials", "brand", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("materials", "isResource", {
      type: Sequelize.BOOLEAN,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("materials", "brand");
    await queryInterface.removeColumn("materials", "isResource");
  },
};
