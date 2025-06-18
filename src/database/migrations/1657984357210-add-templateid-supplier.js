module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("suppliers", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("suppliers", "templateId");
    }
}
