import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {error: ''}
  }

  login(e) {
    e.preventDefault();
    Meteor.loginWithPassword(this.refs.email.value, this.refs.password.value, (error) => {
      console.log('error:', error);
      if (error) {
        this.setState({error: error.message});
      } else {
        window.location.href = '/';
      }
    });
  }

  render() {
    return (
      <form role="form" id="at-pwd-form" onSubmit={this.login.bind(this)}>
        <div className="at-input row">
          <div className="large-12 columns">
              <label htmlFor="email">
                Email
              </label>
            <input type="email" id="email" ref="email" name="at-field-email" placeholder="Email" aria-label="Email " />
          </div>
        </div>
        <div className="at-input row">
          <div className="large-12 columns">
              <label htmlFor="password">
                Password
              </label>
            <input type="password" id="password" ref="password" name="at-field-password" placeholder="Password" aria-label="Password " />
          </div>
        </div>
        <div>
          {this.state.error}
        </div>
        <button type="submit" className="button small">Sign In</button>
      </form>
    );
  }
}

export default Accounts;
