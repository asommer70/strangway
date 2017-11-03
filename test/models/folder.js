const assert = require('assert');
const should = require('chai').should();

const Folder = new require('../../models/folder')();

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
});
