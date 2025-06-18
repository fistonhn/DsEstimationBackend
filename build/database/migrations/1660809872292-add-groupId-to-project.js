"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // add column adminId to table projects
    await queryInterface.addColumn("projects", "groupId", {
      type: Sequelize.INTEGER
    });
  },
  down: async (queryInterface, Sequelize) => {
    // remove column from table projects
    await queryInterface.removeColumn("projects", "groupId", {
      type: Sequelize.INTEGER
    });
  }
};