const { Client } = require('pg');
require('dotenv').config();

module.exports = {
  con: () => {
    const db = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });
    db.connect();
    return db;
  }
}
