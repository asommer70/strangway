import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router-dom';
import { TodoLists } from '../../../imports/collections/todo_lists';
import List from './list';
import NotesList from '../notes/notes_list';

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

      <br/><hr/><br/>
      <a href="#" onClick={(e) => {e.preventDefault(); Meteor.call('notes.insert', (err, noteId) => { props.history.push(`/notes/${noteId}`); }); }} >Create Note</a>
      <br/>

      <NotesList />
    </div>
  );
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Lists);
