const { Client } = require('pg');
require('dotenv').config();

module.exports = {
  con: () => {
    let db;

    if (process.env.NODE_ENV == 'test') {
      db = new Client({
        user: process.env.TEST_DB_USER,
        host: process.env.TEST_DB_HOST,
        database: process.env.TEST_DB_NAME,
        password: process.env.TEST_DB_PASS,
        port: process.env.TEST_DB_PORT,
      });
    } else if (process.env.NODE_ENV == 'dev') {
      db = new Client({
        user: process.env.DEV_DB_USER,
        host: process.env.DEV_DB_HOST,
        database: process.env.DEV_DB_NAME,
        password: process.env.DEV_DB_PASS,
        port: process.env.DEV_DB_PORT,
      });
    } else {
      db = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
      });
    }

    db.connect();
    return db;
  }
}
