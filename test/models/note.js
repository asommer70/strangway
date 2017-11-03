const assert = require('assert');
const should = require('chai').should();

const Note = new require('../../models/note')();

describe('Note', () => {
  describe('create and delete', () => {
    it('should create a note and delete it', (done) => {

      Note.create({name: '11-03-2017', content: "# High...\nwhat what"})
        .then((note) => {
          assert.equal(note.name, '11-03-2017');
          note.delete();
          done();
        });
    });
  });

  describe('findById', () => {
    let mainId;

    before((done) => {
      Note.create({name: 'Stuff', content: "# Need Some Stuff\n\nwhat what"}).then((note) => {
        mainId = note.id;
        done();
      });
    });

    it('should return a note based on an id number', (done) => {
      Note.findById(mainId)
        .then((note) => {
          assert.equal(note.name, 'Stuff');
          note.delete();
          done();
        });
    });
  });

  describe('findAll', () => {
    let thingsId;
    let otherId

    before((done) => {
      Note.create({name: 'Things', content: "# Need Some Things\n\nwhat what"}).then((note) => {
        thingsId = note.id;
        Note.create({name: 'Other', content: "# Need Some Other Stuff\n\nwhat what what"}).then((note) => {
          otherId = note.id;
          done();
        });
      });
    });

    it('should return an array of all notes', (done) => {
      Note.findAll()
        .then((notes) => {
          assert.equal(notes.length, 2);

          notes.forEach((note) => {
            note.delete();
          });
          done();
        });
    });
  });

  describe('update', () => {
    it('should be able to update a note', (done) => {
      Note.create({name: 'Blog Post Ideas', content: "# Need Some Ideas\n\nwhat what\nbeans..."})
        .then((note) => {
          note.name = 'Blog Post Ideas';
          note.save()
            .then(() => {
              Note.findById(note.id)
                .then((note) => {
                  assert.equal(note.name, 'Blog Post Ideas');
                  note.delete();
                  done();
                });
            })
        });
    });
  });
});
