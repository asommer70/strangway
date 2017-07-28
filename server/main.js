import { Meteor } from 'meteor/meteor';
import { TodoLists } from '../imports/collections/todo_lists';
import { Notes } from '../imports/collections/notes';

Meteor.startup(() => {
  const listsCount = TodoLists.find({}).count();
  // console.log('listsCount:', listsCount);

  if (listsCount == 0) {
    TodoLists.insert({name: 'Daily', archive: false, createdAt: new Date()});
    TodoLists.insert({name: 'Strangway', archive: false, createdAt: new Date()});
  }

  Meteor.publish('lists', function() {
    return TodoLists.find({}, {ownerId: this.userId, limit: 20});
  });

  Meteor.publish('notes', function() {
    return Notes.find({}, {ownerId: this.userId, limit: 20});
  });

  Meteor.publish('sharedNotes', function() {
    const user = Meteor.users.findOne(this.userId);

    if (!user) { return; }

    return Notes.find({
      sharedWith: { $elemMatch: { $eq: user.emails[0].address }}
    });
  });
});
