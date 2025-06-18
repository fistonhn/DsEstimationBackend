module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("sub_contractors", "templateId", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("sub_contractors", "templateId");
    }
}