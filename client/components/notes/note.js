import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../../imports/collections/notes';
import moment from 'moment';
import NoteEditor from './note_editor';
import NoteViewer from './note_viewer';
import NoteShare from './note_share';
import NoteTitle from './note_title';

class Note extends Component {
  constructor(props) {
    super(props);
    // console.log('Note constructor props:', props);

    this.state = {
      title: '',
      owner: ''
    };
  }

  componentWillReceiveProps(props) {
    // console.log('Note componentWillReceiveProps props:', props);
    this.setState({
      title: props.note.title,
      owner: props.owner
    });
  }

  render() {
    if (!this.props.note) { return <div>Loading...</div> };
    const owner = Meteor.users.findOne(this.props.note.ownerId).emails[0].address;


    return (
      <div>
        <div className="row">
          <div className="large-8 columns">
            <br/>
            <NoteTitle note={this.props.note} />
          </div>
        </div>

        <div className="row">
          <div className="large-6 column">
            <br/>
            <NoteEditor note={this.props.note} />
          </div>
          <div className="large-6 column">
            <br/>
            <NoteViewer note={this.props.note} />
          </div>
        </div>

        <div className="row">
          <div className="large-6 columns">
            <br/><hr/>
            <h6 className="subheader deets"><strong>Created:</strong> {moment(this.props.note.createdAt).fromNow()}</h6>
            <h6 className="subheader deets float-right"><strong>Owner:</strong> {owner}</h6>
            <br/><br/>
          </div>
        </div>
        <br/>

        <NoteShare note={this.props.note} />
      </div>
    )
  }
}

export default createContainer((props) => {
  Meteor.subscribe('notes');
  const note = Notes.findOne(props.match.params.id);

  let owner;
  if (note) {
    owner = Meteor.users.findOne(note.ownerId).emails[0].address
  }

  return { note, owner }
}, Note);
