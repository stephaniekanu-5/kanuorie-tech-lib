require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
    });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("PostgreSQL Connected ✅");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };