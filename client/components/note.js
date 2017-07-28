import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../imports/collections/notes';
import NoteEditor from './note_editor';

class Note extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="large-10 column">
          <br/>
          <div>Note Details...</div>
          <NoteEditor note={this.props.note} />
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  Meteor.subscribe('notes');
  return { note: Notes.findOne(props.match.params.id) }
}, Note);
