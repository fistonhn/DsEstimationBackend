module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("estimations", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("estimations", "templateId");
    }
}