import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'folders.insert': function(name) {
    return Folders.insert({
      name,
      ownerId: this.userId,
      createdAt: new Date()
    });
  },

  'folders.remove': function(folder) {
    return Folders.remove(folder);
  },

  'folders.update': function(folder, name) {
    return Folders.update(folder._id, { $set: {name} })
  },
});

export const Folders = new Mongo.Collection('folders');
