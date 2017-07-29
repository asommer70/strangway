import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../../imports/collections/notes';
import moment from 'moment';
import NoteEditor from './note_editor';
import NoteViewer from './note_viewer';
import NoteShare from './note_share';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      owner: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.note.title,
      owner: props.owner
    });
  }

  onTitleChange(e) {
    this.setState({title: e.target.value});
  }

  onTitleBlur(e) {
    Meteor.call('notes.update', this.props.note, {title: this.state.title});
  }

  render() {
    if (!this.props.note) { return <div>Loading...</div> };

    return (
      <div>
        <div className="row">
          <div className="large-8 columns">
            <br/>
            <input
              value={this.state.title}
              onChange={this.onTitleChange.bind(this)}
              onBlur={this.onTitleBlur.bind(this)}
              ref="title"
              name="title"
              type="text" placeholder="Title" />
          </div>
        </div>

        <div className="row">
          <div className="large-6 column">
            <br/>
            <h5>Content</h5>
            <NoteEditor note={this.props.note} />
          </div>
          <div className="large-6 column">
            <br/>
            <h5>Rendered</h5>
            <NoteViewer note={this.props.note} />
          </div>
        </div>

        <div className="row">
          <div className="large-6 columns">
            <br/><hr/>
            <h6 className="subheader deets"><strong>Created:</strong> {moment(this.props.note.createdAt).fromNow()}</h6>
            <h6 className="subheader deets float-right"><strong>Owner:</strong> {this.state.owner}</h6>
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
