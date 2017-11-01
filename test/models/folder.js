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
});
