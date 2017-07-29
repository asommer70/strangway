import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../../imports/collections/notes';

class NoteTitle extends Component {
  constructor(props) {
    super(props);

    const title = (props.note.title == "" ? 'Double click to set title.' : props.note.title);

    this.state = {
      title,
      edit: false
    }
  }

  onTitleChange(e) {
    this.setState({title: e.target.value});
  }

  onTitleBlur(e) {
    Meteor.call('notes.update', this.props.note, {title: this.state.title});
    this.setState({edit: !this.state.edit});
  }

  replaceTitle() {
    this.setState({edit: !this.state.edit});
  }

  render() {
    const h1 = <h1 onDoubleClick={this.replaceTitle.bind(this)}>{this.state.title}</h1>;
    const input = (
      <input
        value={this.state.title}
        onChange={this.onTitleChange.bind(this)}
        onBlur={this.onTitleBlur.bind(this)}
        name="title"
        type="text" placeholder="Title" />
    );

    return (
      <div>
        {this.state.edit ? input : h1}
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  return {}
}, NoteTitle);
