// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert("staffs", [
//       {
//         name: "John Doe",
//         email: "admin12@test.com",
//         password:
//           "$2a$10$k.INw011LiKvSO23zm6pUuD55.EkvgegWo0vk3amL07DAM.dFtyfu",
//         role: "admin",
//         isConfirmed: true,
//         managerId: 2,
//       },

//       {
//         name: "Domenic Smith",
//         email: "manager132@test.com",
//         password:
//           "$2a$10$k.INw011LiKvSO23zm6pUuD55.EkvgegWo0vk3amL07DAM.dFtyfu",
//         role: "admin",
//         isConfirmed: false,
//         managerId: 2,
//       },
//     ]);
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete("staffs", null, {});
//   },
// };

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // Generate hashes dynamically
    const salt = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash("admin123", salt);
    const hash2 = await bcrypt.hash("admin123", salt);

    await queryInterface.bulkInsert("staffs", [
      {
        name: "David",
        email: "admin12@test.com",
        password: hash1,
        role: "admin",
        isConfirmed: true,
        managerId: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Samuel",
        email: "manager132@test.com",
        password: hash2,
        role: "admin",
        isConfirmed: false,
        managerId: 2,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("staffs", null, {});
  },
};
