const DB = require('./index');

module.exports = () => {
  const folder = {
    id: undefined,
    name: undefined,
    createdAt: undefined,
    updatedAt: undefined,

    delete: () => {
      const db = DB.con();
      db.query(`delete from folders where id = ${folder.id}`)
        .then((res) => {
          db.end();
        });
    },
  }

  return {
    // findAll: () => crud.findAll(),
    // update: (attrs) => crud.update(attrs),
    // delete: (id) => crud.delete(id),

    create: (name) => {
      const query = {
        text: `INSERT INTO folders (name, createdAt, updatedAt) values ($1, $2, $3) RETURNING *;`,
        values: [
          name,
          new Date(),
          new Date(),
        ]
      }
      // db.start();
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          folder.id = res.rows[0].id;
          folder.name = res.rows[0].name;
          folder.createdAt = res.rows[0].createdat;
          folder.updatedAt = res.rows[0].updatedat;

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
      // db.start();
      const db = DB.con();

      return db.query(query)
        .then((res) => {
          folder.id = res.rows[0].id;
          folder.name = res.rows[0].name;
          folder.createdAt = res.rows[0].createdat;
          folder.updatedAt = res.rows[0].updatedat;

          db.end();
          return folder;
        })
        .catch(e => console.error(e.stack));
    },
  }
}
