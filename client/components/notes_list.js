import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../imports/collections/notes';

class NotesList extends Component {
  constructor(props) {
    super(props);
  }

  onNoteRemove(note) {
    Meteor.call('notes.remove', note);
  }

  render() {
    const RenderedNotes = this.props.notes.map((note) => {
      return (
        <li key={note._id}>
          <a href={'/notes/' + note._id}>{note._id}</a>
          <span className="float-right">
            <button type="button" className="button alert tiny" onClick={() => this.onNoteRemove(note)}>Remove</button>
          </span>
        </li>
      );
    });

    return (
      <div>
        <ul className="notes-list no-bullet">
          {RenderedNotes}
        </ul>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  return { notes: Notes.find({}).fetch() };
}, NotesList);
