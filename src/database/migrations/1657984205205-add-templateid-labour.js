module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("labours", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("labours", "templateId");
    }
}