import { Mongo } from 'meteor/mongo';
// import { check, Match } from 'meteor/check';

Meteor.methods({
  'todo_lists.insert': function(name) {
    if (name.length == 0) {
      throw new Meteor.Error(500, 'Name is empty.', 'Name cannot be empty.');
    }

    TodoLists.insert({name, archive: false, createdAt: new Date()});
  },

  'todo_lists.update': function(todo_list, changes) {
    return TodoLists.update(todo_list._id, { $set: changes })
  },

  'todo_lists.remove': function(todo_list) {
    return TodoLists.remove(todo_note);
  },
})

export const TodoLists = new Mongo.Collection('lists');
