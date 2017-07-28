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
  }
});

export const Notes = new Mongo.Collection('notes');
