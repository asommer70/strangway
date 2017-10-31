const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: 'secretpassword',
  port: 3211,
});

client.connect();

// const mysql = require('mysql');
//
// var env  = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.json')[env];
//
// const db = mysql.createConnection({
//   host: config.host,
//   user: config.username,
//   password: config.password,
//   database: config.database
// });
//
// db.connect();
//
// db.User = require('./user')(db);
// db.Item = require('./item')(db);
// db.Property = require('./property')(db);
// db.Pick = require('./pick')(db);
// db.PickOwner = require('./pick_owner')(db);
// db.Customer = require('./customer')(db);
//
// module.exports = db;
