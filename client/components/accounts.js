import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import '../accounts.html';

class Accounts extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.atForm, ReactDOM.findDOMNode(this.refs.auths));
  }

  comnponentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return (
      <div ref="auths"></div>
    );
  }
}

export default Accounts;
