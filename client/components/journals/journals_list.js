import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Journals } from '../../../imports/collections/journals';

class JournalsList extends Component {
  constructor(props) {
    super(props);
  }

  onNoteRemove(note) {
    Meteor.call('notes.remove', note);
  }

  render() {
    const RenderedJournals = this.props.journals.map((journal) => {
      return (
        <li key={note._id}>
          <Link to={'/journals/' + note._id}>{journal.title}</Link>

          <span className="float-right">
            <button type="button" className="button alert tiny" onClick={() => this.onJournalRemove(journal)}>Remove</button>
          </span>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="large-12 columns">
          <br/>
          <ul className="notes-list no-bullet">
            {RenderedJournals}
          </ul>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('journals');
  return { notes: Journals.find({}).fetch() };
}, JournalsList);
