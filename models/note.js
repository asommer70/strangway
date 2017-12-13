const DB = require('./index');

var Note = function(attrs) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.content = attrs.content;
    this.folderId = attrs.folderid;
    this.createdAt = attrs.createdat;
    this.updatedAt = attrs.updatedat;

    this.delete = () => {
      const db = DB.con();
      return db.query(`delete from notes where id = ${this.id}`)
        .then((res) => {
          db.end();
        });
    }

    this.save = () => {
      const db = DB.con();
      const query = {
        text: `update notes set name = $1, content = $2, folderid = $3, updatedat = $4 where id = $5;`,
        values: [this.name, this.content, this.folderId, new Date(), this.id]
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
    note: Note,

    create: (attrs) => {
      const query = {
        text: `INSERT INTO notes (name, content, folderid, createdAt, updatedAt) values ($1, $2, $3, $4, $5) RETURNING *;`,
        values: [
          attrs.name,
          attrs.content,
          attrs.folderId,
          new Date(),
          new Date(),
        ]
      }
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          const note = new Note(res.rows[0]);
          db.end();
          return note;
        })
        .catch(e => console.error(e.stack));
    },

    findById: (id) => {
      const query = {
        text: `select *, to_char(notes.updatedat, 'MM-DD-YYYY HH:MI:SS') as updatedat, to_char(notes.createdat, 'MM-DD-YYYY HH:MI:SS') as createdat from notes where id = $1;`,
        values: [id]
      }
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          const note = new Note(res.rows[0]);
          db.end();
          return note;
        })
        .catch(e => console.error(e.stack));
    },

    findAll: () => {
      const db = DB.con();

      return db.query(`select *, to_char(notes.updatedat, 'MM-DD-YYYY HH:MI:SS') as updatedat, to_char(notes.createdat, 'MM-DD-YYYY HH:MI:SS') as createdat from notes order by notes.updatedat desc;`)
        .then((res) => {
          db.end();

          // Add the save and delete methods.
          const notes = [];
          res.rows.forEach((row) => {
            notes.push(new Note(row));
          });

          return notes;
        })
        .catch(e => console.error(e.stack));
    },
  }
}
