const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "stephanie",
  password: "783743",
  database: "kanuorietech",
  logging: false, // cleaner console
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