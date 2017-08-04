import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../../imports/collections/notes';

class NotesList extends Component {
  constructor(props) {
    super(props);
  }

  onNoteRemove(note) {
    Meteor.call('notes.remove', note);
  }

  render() {
    if (!this.props.notes) { return <div>No Notes... yet.</div>; }

    const RenderedNotes = this.props.notes.map((note) => {
      return (
        <li key={note._id}>
          <Link to={'/notes/' + note._id}>{note.title}</Link>

          <span className="float-right">
            <button type="button" className="button alert tiny" onClick={() => this.onNoteRemove(note)}>Remove</button>
          </span>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="large-12 columns">
          <br/>
          <ul className="notes-list no-bullet">
            {RenderedNotes}
          </ul>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  Meteor.subscribe('sharedNotes');
  return { notes: Notes.find({}).fetch() };
}, NotesList);
