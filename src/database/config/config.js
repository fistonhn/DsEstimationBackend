// require("dotenv").config();

// module.exports = {
//   development: {
//     username: "postgres",
//     password: "F@123456",
//     database: "dsestimation",
//     dialect: "postgres",
//     logging: false,
//     pool: {
//       max: 20,
//       min: 0,
//       acquire: 60000,
//       idle: 10000
//     }
//   },
//   test: {
//     // url: process.env.TEST_DATABASE_URL,
//     // dialect: "pg",
//     // password: process.env.DATABASE_PASSWORD,
//     // logging: false,
//     username: "postgres",
//     password: "F@123456",
//     database: "dsestimationtest",
//     dialect: "postgres",
//     logging: false,
//   },
//   production: {
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     logging: false,
//     pool: {
//       max: 20,
//       min: 0,
//       acquire: 60000,
//       idle: 10000
//     }
//   },
// };

require("dotenv").config();

module.exports = {
  development: {
    // username: "postgres",
    // password: "F@123456",       // npg_cGnrms63tKYH  this is the password for the postgres user production
    // database: "dsestimation",
    // host: "127.0.0.1",          // ✅ add this
    // port: 5432,                 // ✅ add this
    // dialect: "postgres",
    // logging: false,
    // pool: {
    //   max: 20,
    //   min: 0,
    //   acquire: 60000,
    //   idle: 10000
    // }

    
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  test: {
    // username: "postgres",
    // password: "F@123456",
    // database: "dsestimationtest",
    // host: "127.0.0.1",
    // port: 5432,
    // dialect: "postgres",
    // logging: false,

    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
};
