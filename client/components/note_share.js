import React, { Component } from 'react';

class NoteShare extends Component {
  onShareClick(e) {
    Meteor.call('notes.share', this.props.note, this.refs.email.value);
    this.refs.email.value = '';
  }

  renderSharedList() {
    return this.props.note.sharedWith.map((email) => {
      return (
        <li key={email}>{email}</li>
      );
    });
  }

  render() {
    if (!this.props.note) { return <div>Loading...</div> };

    return (
      <footer className="share">
        <div className="row">
          <div className="large-4 columns">
            <div className="input-group shared">
              <input className="input-group-field" type="text" ref="email" placeholder="Email" />
              <div className="input-group-button">
                <input type="submit" className="button" value="Share" onClick={this.onShareClick.bind(this)} />
              </div>
            </div>
          </div>

          <div className="large-8 columns">
            <h6 className="subheader sharedwith">Shared With:</h6>
            <ul className="no-bullet inline">
              {this.renderSharedList()}
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default NoteShare;
