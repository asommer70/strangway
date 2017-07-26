import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Strangway</li>
            <li className="is-active"><a href="/">Lists</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/journal">Journal</a></li>
            <li><a href="/contacts">Contacts</a></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><input type="search" placeholder="Search" /></li>
            <li><button type="button" className="button">Search</button></li>
            <li><a href="/signup">Sign up</a></li>
            <li><a href="/signin">Sign in</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;
