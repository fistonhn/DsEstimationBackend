"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [{
      name: "procurement manager"
    }, {
      name: "procurement officer"
    }, {
      name: "project manager"
    }, {
      name: "admin"
    }, {
      name: "cost controller"
    }, {
      name: "chief quantity surveyor"
    }, {
      name: "project quantity surveyor"
    }, {
      name: "site engineer"
    }, {
      name: "estimator"
    }, {
      name: "storekeeper"
    }, {
      name: "human resource"
    }, {
      name: "equipments manager"
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  }
};