import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'journals.insert': function() {
    return Journals.insert({
      title: '',
      content: "\n\n\n\n\n\n\n\n\n\n\n\n",
      ownerId: this.userId,
      createdAt: new Date()
    });
  },

  'journals.remove': function(note) {
    return Journals.remove(note);
  },

  'journal.update': function(journal, changes) {
    return Journals.update(journal._id, { $set: changes })
  },
});

export const Journals = new Mongo.Collection('journals');
