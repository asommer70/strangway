import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class NoteEditor extends Component {
  onEditorChange(content) {
    Meteor.call('notes.update', this.props.note, {content});
  }

  render() {
    if (!this.props.note) { return <div>Loading...</div> };

    return (
      <CodeMirror
        value={this.props.note.content}
        onChange={this.onEditorChange.bind(this)}
        options={{mode: 'markdown', lineNumbers: true}} />
    );
  }
}

export default NoteEditor;
