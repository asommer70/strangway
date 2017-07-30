import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ListForm from './list_form';
import { TodoLists } from '../../../imports/collections/todo_lists';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    }
  }

  render() {
    return (
      <div className="row">
        <div className="large-4 columns">
          <h2>{this.props.list.name}</h2>

          <button type="button" className="button tiny" onClick={() => this.setState({edit: !this.state.edit})}>Edit</button>
          {this.state.edit ? <ListForm list={this.props.list} /> : ''}

          <div>
            Some Tasks...
          </div>
        </div>
      </div>
    );
  }
}

// export default List;
export default createContainer((props) => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.findOne(props.list._id) }
}, List);
