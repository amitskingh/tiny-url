require("dotenv").config() // Load environment variables from .env file
const path = require("path")

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "tinyurl",
    host: "db",
    dialect: "postgres",

    migrationStorage: "sequelize",
    migrationStoragePath: path.join(__dirname, "../migrations"),
    seederStorage: "sequelize",
    seederStoragePath: path.join(__dirname, "../seeders"),
  },
  // test: {
  //   username: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: "tinyurl_test",
  //   host: "db",
  //   dialect: "postgres",
  // },
  // production: {
  //   username: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: "tinyurl_prod",
  //   host: "db",
  //   dialect: "postgres",
  // },
}
