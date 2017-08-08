import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Accounts from './accounts';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: ''
    }
  }

  createNote(e) {
    e.preventDefault();

    Meteor.call('notes.insert', (err, noteId) => {
      this.props.history.push(`/notes/${noteId}`);
    });
  }

  signOut(e) {
    Meteor.logout();
    this.props.history.push('/');
    window.reload();
  }

  render() {
    if (Meteor.userId()) {
      return (
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">Strangway</li>
              <li>
                <NavLink to="/todolists" activeClassName="is-active">Lists</NavLink>
              </li>
              <li className="white">
                <NavLink to="/notes" className="white" activeClassName="is-active">Notes</NavLink>
                <ul className="menu vertical">
                 <li><a href="#" onClick={this.createNote.bind(this)}>Create Note</a></li>
                </ul>
              </li>
              <li><NavLink to="/journals" activeClassName="is-active">Journals</NavLink></li>
              <li><NavLink to="/contacts" activeClassName="is-active">Contacts</NavLink></li>
              <li><NavLink to="/recipes" activeClassName="is-active">Recipes</NavLink></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><input type="search" placeholder="Search" /></li>
              <li><button type="button" className="button">Search</button></li>
              <li>
                <a href="#" data-toggle="auth-form">Account</a>
                <div className="dropdown-pane" id="auth-form" data-dropdown data-auto-focus="true">
                  <button type="button" className="button secondary tiny" onClick={this.signOut.bind(this)}>Sign Out</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">Strangway</li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <a href="#" data-toggle="auth-form">Sign In</a>
                <div className="dropdown-pane" id="auth-form" data-dropdown data-auto-focus="true">
                  <Accounts />
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default Header;
