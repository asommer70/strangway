import React, { Component } from 'react';

class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      name: (props.list ? props.list.name : '')
    };
  }

  errorCheck(err, self) {
    const $alert = $('#list-form-error');

    if (err) {
      self.setState({error: 'Name cannot be empty.'});
      if ($alert.hasClass('hide')) {
        $alert.toggleClass('hide');
      }
    } else {
      self.setState({error: ''});
      if (!$alert.hasClass('hide')) {
        $alert.toggleClass('hide');
      }

      if (!self.props.list) {
        this.setState({name: ''});
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.list) {
      Meteor.call('todo_lists.update', this.props.list, {name: this.state.name}, (err) => {
        this.errorCheck(err, this);
      });
    } else {
      Meteor.call('todo_lists.insert', this.state.name, (err) => {
        this.errorCheck(err, this);
      });
    }
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset className="fieldset">
            <legend>{this.props.list ? 'Edit' : 'New'} ToDo List</legend>

            <label htmlFor="name">Name</label>
            <input value={this.state.name} onChange={this.handleNameChange.bind(this)} id="name" type="text" />
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
