const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "Stephanie Kanu",   // 👈 THIS is the correct one
  password: "783743",
  database: "kanuorietech",
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