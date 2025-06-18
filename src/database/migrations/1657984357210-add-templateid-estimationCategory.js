module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("estimation_categories", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("estimation_categories", "templateId");
    }
}
