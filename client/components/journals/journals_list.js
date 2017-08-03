import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Journals } from '../../../imports/collections/journals';

class JournalsList extends Component {
  constructor(props) {
    super(props);
  }

  onJournalRemove(journal) {
    Meteor.call('journals.remove', journal);
  }

  createJournal() {
    console.log('createJournal...');
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
        <div className="large-4 columns">
          <br/>
          <ul className="notes-list no-bullet">
            {RenderedJournals}
          </ul>
        </div>
        <div className="large-6 columns">
          <h2>Middle stuff...</h2>
        </div>
        <div className="large-2 columns">
          <form>
            <input ref="newJournal" type="text" placeholder="New Journal Name" onClick={this.createJournal.bind(this)}/>
          </form>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  console.log('createContainer JournalsList...');
  Meteor.subscribe('journals');
  return { journals: Journals.find({}).fetch() };
}, JournalsList);
