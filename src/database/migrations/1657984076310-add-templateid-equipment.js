module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("equipments", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("equipments", "templateId");
    }
}