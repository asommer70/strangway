import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'notes.insert': function() {
    return Notes.insert({
      title: '',
      content: '',
      sharedWith: [],
      ownerId: this.userId,
      createdAt: new Date()
    });
  },

  'notes.remove': function(note) {
    return Notes.remove(note);
  },

  'notes.update': function(note, changes) {
    console.log('notes.update changes:', changes);
    return Notes.update(note._id, { $set: changes })
  },

  'notes.share': function(note, email) {
    return Notes.update(note._id, { $push: { sharedWith: email } });
  }
});

export const Notes = new Mongo.Collection('notes');
