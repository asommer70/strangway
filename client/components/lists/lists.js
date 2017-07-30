import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router-dom';
import { TodoLists } from '../../../imports/collections/todo_lists';
import List from './list';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 'No Todo List selected... yet.'
    };
  }

  selectList(self, list) {
    self.setState({list: <List list={list} />});
  }

  render() {
    const RenderedLists = this.props.lists.map((list) => {
      return (
        <li key={list._id}><a href="#" onClick={() => this.selectList(this, list)}>{list.name}</a></li>
      )
    });

    return (
      <div className="row">
        <div className="large-2 columns">
          <ul className="spaced no-bullet">
            {RenderedLists}
          </ul>
        </div>
        <div className="large-10 columns">
          {this.state.list}
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Lists);
