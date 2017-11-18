const assert = require('assert');
const should = require('chai').should();

const User = new require('../../models/user')();

describe('User', () => {
  describe('create and delete', () => {
    it('should create a user and delete it', (done) => {

      User.create({username: 'adam', email: 'adam@thehoick.com', password: 'taconight'})
        .then((user) => {
          assert.equal(user.email, 'adam@thehoick.com');
          user.delete();
          done();
        });
    });
  });

  describe('findById', () => {
    let adamId;

    before((done) => {
      User.create({username: 'adam', email: 'taco@thehoick.com', password: 'nightnight'}).then((user) => {
        adamId = user.id;
        done();
      });
    });

    it('should return a user based on an id number', (done) => {
      User.findById(adamId)
        .then((user) => {
          assert.equal(user.email, 'taco@thehoick.com');
          assert.equal(user.password, undefined);
          user.delete();
          done();
        });
    });
  });

  describe('findByUsername', () => {
    let bob = {username: 'bob', email: 'bob@thehoick.com', password: 'slidell'};

    before((done) => {
      User.create(bob).then((user) => {
        bob.id = user.id;
        done();
      });
    });

    it('should return a user based on an username', (done) => {
      User.findByUsername(bob.username)
        .then((user) => {
          assert.equal(user.email, 'bob@thehoick.com');
          assert.equal(user.password, undefined);
          user.delete();
          done();
        });
    });
  });

  describe('update', () => {
    it('should be able to update a user', (done) => {
      User.create({username: 'adam', email: 'batman@thehoick.com', password: 'ownsthenight'})
        .then((user) => {
          user.email = 'joker@thehoick.com';
          user.save()
            .then(() => {
              User.findById(user.id)
                .then((user) => {
                  assert.equal(user.email, 'joker@thehoick.com');
                  user.delete();
                  done();
                });
            })
        });
    });
  });
});
