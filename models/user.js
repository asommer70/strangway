const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const DB = require('./index');

var User = function(attrs) {
    this.id = attrs.id;
    this.username = attrs.username;
    this.email = attrs.email;
    this.password = attrs.password;
    this.createdAt = attrs.createdat;
    this.updatedAt = attrs.updatedat;

    this.delete = () => {
      const db = DB.con();
      return db.query(`delete from users where id = ${this.id}`)
        .then((res) => {
          db.end();
        });
    }

    this.save = () => {
      const db = DB.con();
      const query = {
        text: `update users set username = $1, email = $2, password = $3, updatedat = $4 where id = $5;`,
        values: [this.username, this.email, this.password, new Date(), this.id]
      }

      return db.query(query)
        .then((res) => {
          db.end();
          return this;
        })
        .catch(e => console.error(e.stack));
    }
}

module.exports = () => {
  return {
    user: User,

    create: (attrs) => {
      return bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        return bcrypt.hash(attrs.password, salt, null, (err, hash) => {
          if (err) { return next(err); }
          attrs.password = hash;

          const query = {
            text: `INSERT INTO users (username, email, password, createdAt, updatedAt) values ($1, $2, $3, $4, $5) RETURNING *;`,
            values: [
              attrs.username,
              attrs.email,
              attrs.password,
              new Date(),
              new Date(),
            ]
          }
          const db = DB.con();

          return db.query(query)
            .then((res) => {
              const user = new User(res.rows[0]);
              db.end();
              return user;
            })
            .catch(e => console.error(e.stack));
        });
      });
    },

    findById: (id) => {
      const query = {
        text: `select *, to_char(updatedat, 'MM-DD-YYYY HH:MI:SS') as updatedat from users where id = $1;`,
        values: [id]
      }
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          const note = new User(res.rows[0]);
          db.end();
          return note;
        })
        .catch(e => console.error(e.stack));
    },
  }
}
