import React, { Component } from 'react';

class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    Meteor.call('todo_lists.insert', this.refs.input.value, (err) => {
      const $alert = $('#list-form-error');

      if (err) {
        this.setState({error: 'Name cannot be empty.'});
        if ($alert.hasClass('hide')) {
          $alert.toggleClass('hide');
        }
      } else {
        this.setState({error: ''});
        if (!$alert.hasClass('hide')) {
          $alert.toggleClass('hide');
        }
        this.refs.input.value = '';
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset className="fieldset">
            <legend>New ToDo List</legend>

            <label htmlFor="name">Name</label>
            <input ref="input" id="name" type="text" />
            <div id="list-form-error" className="alert callout hide">
              <p>{this.state.error}</p>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default ListForm;
