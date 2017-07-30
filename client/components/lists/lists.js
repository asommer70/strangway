import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router-dom';
import { TodoLists } from '../../../imports/collections/todo_lists';
import List from './list';

const Lists = (props) => {
  const RenderedLists = props.lists.map((list) => {
    return (
      <li key={list._id}><Link to={'/lists/' + list._id}>{list.name}</Link></li>
    )
  });

  return (
    <div>
      <ul className="spaced no-bullet">
        {RenderedLists}
      </ul>
    </div>
  );
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Lists);
