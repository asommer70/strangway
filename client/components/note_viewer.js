import React, { Component } from 'react';
import { markdown } from 'markdown';

class NoteViewer extends Component {
  render() {
    if (!this.props.note) { return <div>Loading...</div> };

    const rawHTML = markdown.toHTML(this.props.note.content);

    return (
      <div dangerouslySetInnerHTML={{__html: rawHTML}}></div>
    )
  }
}

export default NoteViewer;
