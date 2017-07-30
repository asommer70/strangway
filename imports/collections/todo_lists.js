import { Mongo } from 'meteor/mongo';
// import { check, Match } from 'meteor/check';

Meteor.methods({
  'todo_lists.insert': function(name) {
    if (name.length == 0) {
      throw new Meteor.Error(500, 'Name is empty.', 'Name cannot be empty.');
    }

    TodoLists.insert({
      name,
      archive: false,
      tasks: [],
      createdAt: new Date()});
  },

  'todo_lists.update': function(todo_list, changes) {
    return TodoLists.update(todo_list._id, { $set: changes })
  },

  'todo_lists.remove': function(todo_list) {
    return TodoLists.remove(todo_list);
  },

  'todo_lists.addTask': function(newTask) {
    console.log('todo_lists.addTask newTask:', newTask);
    const task = {
      _id:  new Mongo.ObjectID(),
      title: newTask.title,
      complete: false,
      archive: false,
      createdAt: new Date()
    }

    const things = TodoLists.update(newTask.list._id, { $push: {tasks: task} }, (err, status) => {
      return TodoLists.findOne(newTask.list._id);
    });
    console.log('things:', things);
    return things;
  },

  'todo_lists.completeTask': function(todo_list, task) {
    console.log('todo_lists.updateTask task:', task, 'todo_list:', todo_list);
    TodoLists.update({
      _id: todo_list._id, 'tasks._id': new Mongo.ObjectID(task._id)},
      { $set: { 'tasks.$.complete': task.complete }
    });
  },

  'todo_lists.removeTask': function(list, task) {
    return TodoLists.update({_id: list._id}, { $pull: { tasks: {_id: task._id} } });
  }
})

export const TodoLists = new Mongo.Collection('lists');
