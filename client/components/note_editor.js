import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class NoteEditor extends Component {
  render() {
    return (
      <div className="row">
        <div className="large-6 columns">
          <CodeMirror options={{mode: 'markdown', lineNumbers: true}} />
        </div>
      </div>
    );
  }
}

export default NoteEditor;
