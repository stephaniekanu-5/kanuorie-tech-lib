const sqliteDb = require("../db"); // your old SQLite file
const pgDb = require("../db.postgres");

// switch flag
const USE_POSTGRES = true;

module.exports = USE_POSTGRES ? pgDb : sqliteDb;