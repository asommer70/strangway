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
});
