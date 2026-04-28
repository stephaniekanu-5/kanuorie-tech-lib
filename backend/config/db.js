require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected ✅");
    console.log("Using migration-based schema (sync disabled) 🚀");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };