import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../imports/collections/notes';
import moment from 'moment';
import NoteEditor from './note_editor';
import NoteViewer from './note_viewer';
import NoteShare from './note_share';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  componentWillReceiveProps(props) {
    console.log('props.note:', props.note);
    this.setState({title: props.note.title});
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
              value={this.props.note.title}
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
            <h6 className="subheader deets float-right"><strong>Owner:</strong> ...</h6>
            <br/><br/>
          </div>
        </div>

        <NoteShare note={this.props.note} />
      </div>
    )
  }
}

export default createContainer((props) => {
  Meteor.subscribe('notes');
  return { note: Notes.findOne(props.match.params.id) }
}, Note);
