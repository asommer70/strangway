const assert = require('assert');
const should = require('chai').should();

const Folder = new require('../../models/folder')();
const Note = new require('../../models/note')();

describe('Folder', () => {
  describe('create and delete', () => {
    it('should create a folder and delete it', (done) => {

      Folder.create('Ideas')
        .then((folder) => {
          assert.equal(folder.name, 'Ideas');
          folder.delete();
          done();
        });
    });
  });

  describe('findById', () => {
    let mainId;

    before((done) => {
      Folder.create('Main').then((folder) => {
        mainId = folder.id;
        done();
      });
    });

    it('should return a folder based on an id number', (done) => {
      Folder.findById(mainId)
        .then((folder) => {
          assert.equal(folder.name, 'Main');
          folder.delete();
          done();
        });
    });
  });

  describe('findAll', () => {
    let thingsId;
    let otherId

    before((done) => {
      Folder.create('Things').then((folder) => {
        thingsId = folder.id;
        Folder.create('Other').then((folder) => {
          otherId = folder.id;
          done();
        });
      });
    });

    it('should return an array of all folders', (done) => {
      Folder.findAll()
        .then((folders) => {
          assert.equal(folders.length, 2);

          folders.forEach((folder) => {
            folder.delete();
          });
          done();
        });
    });
  });

  describe('update', () => {
    it('should be able to update a folder', (done) => {
      Folder.create('Blog')
        .then((folder) => {
          folder.name = 'Blog Posts';
          folder.save()
            .then(() => {
              Folder.findById(folder.id)
                .then((folder) => {
                  assert.equal(folder.name, 'Blog Posts');
                  folder.delete();
                  done();
                });
            })
        });
    });
  });

  describe('a folder has many notes', () => {
    let mainId;
    let thingsId;
    let otherId;

    before((done) => {
      Folder.create('Main').then((folder) => {
        mainId = folder.id;
        Note.create({name: 'Things', content: "# Need Some Things\n\nwhat what", folderId: mainId}).then((note) => {
          thingsId = note.id;
          Note.create({name: 'Other', content: "# Need Some Other Stuff\n\nwhat what what", folderId: mainId})
            .then((note) => {
              otherId = note.id;
              done();
            });
        });
      });
    });

    after((done) => {
      Note.findAll()
        .then((notes) => {
          notes[0].delete()
            .then(() => {
              notes[1].delete()
                .then(() => {
                  Folder.findById(mainId)
                    .then((folder) =>{
                      folder.delete();
                      done();
                    });
                });
            });
        });
    });

    it('should have two notes', (done) => {
      Folder.findById(mainId)
        .then((folder) => {
          folder.notes()
            .then((notes) => {
              assert.equal(notes.length, 2);
              done();
            })
        });
    });
  });
});
