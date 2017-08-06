import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../../imports/collections/notes';
import { Folders } from '../../../imports/collections/folders';
import Folder from './folder';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFolder: false
    }
  }

  onNoteRemove(note) {
    Meteor.call('notes.remove', note);
  }

  createFolder(e) {
    e.preventDefault();

    Meteor.call('folders.insert', this.refs.folderName.value);
    this.refs.folderName.value = '';
    this.setState({addFolder: !this.state.addFolder});
  }

  removeFolder(idx) {
    Meteor.call('folders.remove', this.props.folders[idx]);
  }

  updateFolder(idx, newName) {
    Meteor.call('folders.update', this.props.folders[idx], newName)
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

    let renderedFolders;
    if (this.props.folders) {
      renderedFolders = this.props.folders.map((folder, idx) => {
        return (
          <Folder key={folder._id} idx={idx} folder={folder}
            removeFolder={this.removeFolder.bind(this)} updateFolder={this.updateFolder.bind(this)} />
        );
      });
    } else {
      renderedFolders = <div></div>;
    }

    const newFolderForm = (
      <form onSubmit={this.createFolder.bind(this)}>
        <fieldset>
          <legend>Add Folder</legend>
          <input type="text" ref="folderName" name="name" placeholder="Name" />
        </fieldset>
      </form>
    );

    return (
      <div className="row">
        <div className="large-2 columns">
          <br/>

          <button type="button" className="button tiny" onClick={() => this.setState({addFolder: !this.state.addFolder})}>
            Add Folder
          </button>
          {this.state.addFolder ? newFolderForm : ''}
          <hr className="no-top-margin"/>


          <ul className="notes-list no-bullet">
            {this.props.folders ? renderedFolders : ''}
          </ul>
        </div>

        <div className="large-4 columns">
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
  Meteor.subscribe('folders');
  Meteor.subscribe('sharedNotes');
  return { notes: Notes.find({}).fetch(), folders: Folders.find({}).fetch() };
}, NotesList);
