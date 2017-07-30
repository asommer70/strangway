import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Accounts from './accounts';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  createNote(e) {
    e.preventDefault();

    Meteor.call('notes.insert', (err, noteId) => {
      this.props.history.push(`/notes/${noteId}`);
    });
  }

  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">Strangway</li>
            <li className="is-active"><a href="/">Lists</a></li>
            <li>
              <Link to="/noteslist">Notes</Link>
                <ul className="menu vertical">
                 <li><a href="#" onClick={this.createNote.bind(this)}>Create Note</a></li>
                </ul>
            </li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><input type="search" placeholder="Search" /></li>
            <li><button type="button" className="button">Search</button></li>
            <li>
              <a href="#" data-toggle="auth-form">Sign In</a>
              <div className="dropdown-pane" id="auth-form" data-dropdown data-auto-focus="true">
                <Accounts />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;
