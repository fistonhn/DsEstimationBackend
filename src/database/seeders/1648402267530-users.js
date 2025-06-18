// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert("users", [
//       {
//         name: "Demo Owner",
//         email: "owner12@test.com",
//         password:
//           "$2a$10$k.INw011LiKvSO23zm6pUuD55.EkvgegWo0vk3amL07DAM.dFtyfu",
//         role: "owner",
//         isConfirmed: true,
//       },
//       {
//         name: "Jane Smith",
//         email: "manager12@test.com",
//         password:
//           "$2a$10$k.INw011LiKvSO23zm6pUuD55.EkvgegWo0vk3amL07DAM.dFtyfu",
//         role: "manager",
//         isConfirmed: true,
//       },
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete("users", null, {});
//   },
// };


const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const salt = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash("admin123", salt);
    const hash2 = await bcrypt.hash("admin123", salt);

    return queryInterface.bulkInsert("users", [
      {
        name: "David",
        email: "owner12@test.com",
        password: hash1,
        role: "owner",
        isConfirmed: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Samuel",
        email: "manager12@test.com",
        password: hash2,
        role: "manager",
        isConfirmed: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
