import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../imports/collections/notes';

class NotesList extends Component {
  render() {
    console.log('this.props.notes:', this.props.notes);
    return (
      <div>Notes...</div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  return { notes: Notes.find({}).fetch() };
}, NotesList);
