const db = require('./index');

module.exports = () => {
  const folder = {
    id: undefined,
    name: undefined,
    createdAt: undefined,
    updatedAt: undefined,

    delete: () => {
      db.query(`delete from folders where id = ${folder.id}`)
        .then((res) => {
          db.end();
        });
    },
  }

  return {
    // create: (attrs) => crud.create(attrs),
    // findById: (id) => crud.findById(id),
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

      return db.query(query)
        .then((res) => {
          folder.id = res.rows[0].id;
          folder.name = res.rows[0].name;
          folder.createdAt = res.rows[0].createdat;
          folder.updatedAt = res.rows[0].updatedat;

          return folder;
        })
        .catch(e => console.error(e.stack));
    },
  }
}
