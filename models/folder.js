const DB = require('./index');

const Note = new require('./note')();

var Folder = function(attrs) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.createdAt = attrs.createdat;
    this.updatedAt = attrs.updatedat;

    this.delete = () => {
      const db = DB.con();
      return db.query(`delete from folders where id = ${this.id}`)
        .then((res) => {
          db.end();
        });
    }

    this.save = () => {
      const db = DB.con();
      const query = {
        text: `update folders set name = $1, updatedat = $2 where id = $3;`,
        values: [this.name, this.updatedAt, this.id]
      }

      return db.query(query)
        .then((res) => {
          db.end();
          return this;
        })
        .catch(e => console.error(e.stack));
    }

    this.notes = () => {
      const db = DB.con();
      const query = {
        text: `select *, to_char(notes.updatedat, 'MM-DD-YYYY HH:MI:SS') as updatedat, to_char(notes.createdat, 'MM-DD-YYYY HH:MI:SS') as createdat from notes where folderId = $1 order by notes.updatedat desc;`,
        values: [this.id]
      }

      return db.query(query)
        .then((res) => {
          db.end();

          // Add the save and delete methods.
          const notes = [];
          res.rows.forEach((row) => {
            notes.push(new Note.note(row));
          });

          return notes;
        })
        .catch(e => console.error(e.stack));
    }
}

module.exports = () => {
  return {
    create: (name) => {
      const query = {
        text: `INSERT INTO folders (name, createdAt, updatedAt) values ($1, $2, $3) RETURNING *;`,
        values: [
          name,
          new Date(),
          new Date(),
        ]
      }
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          const folder = new Folder(res.rows[0]);
          db.end();
          return folder;
        })
        .catch(e => console.error(e.stack));
    },

    findById: (id) => {
      const query = {
        text: `select * from folders where id = $1;`,
        values: [id]
      }
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          const folder = new Folder(res.rows[0]);
          db.end();
          return folder;
        })
        .catch(e => console.error(e.stack));
    },

    findAll: () => {
      const db = DB.con();

      return db.query(`select * from folders order by createdat;`)
        .then((res) => {
          db.end();

          // Add the save and delete methods.
          const folders = [];
          res.rows.forEach((row) => {
            folders.push(new Folder(row));
          });

          return folders;
        })
        .catch(e => console.error(e.stack));
    },
  }
}
