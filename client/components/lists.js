import React from 'react';
import { TodoLists } from '../../imports/collections/todo_lists';
import { createContainer } from 'meteor/react-meteor-data';
import List from './list';
import NotesList from './notes_list';

const Lists = ({lists}) => {
  const RenderedLists = lists.map((list) => {
    return <List key={list._id} list={list} />
  });

  return (
    <div>
      <ul className="spaced no-bullet">
        {RenderedLists}
      </ul>

      <br/><hr/><br/>
      <a href="#" onClick={(e) => {e.preventDefault(); Meteor.call('notes.insert');}} >Create Note</a>
      <NotesList />
    </div>
  );
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Lists);
