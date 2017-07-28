import React from 'react';
import { TodoLists } from '../../imports/collections/todo_lists';
import { createContainer } from 'meteor/react-meteor-data';
import List from './list';

const Lists = ({lists}) => {
  const RenderedLists = lists.map((list) => {
    return <List key={list._id} list={list} />
  });

  return (
    <ul className="spaced no-bullet">
      {RenderedLists}
    </ul>
  );
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Lists);
