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
    const listy = (
      <List list={list}
        removeList={self.removeList.bind(this)}
        removeTask={self.removeTask.bind(this)}
        addTask={self.addTask.bind(this)} />
    );
    self.setState({list: listy});
  }

  removeList(list) {
    Meteor.call('todo_lists.remove', list, () => {
      this.setState({list: 'No Todo List selected... yet.'});
    });
  }

  addTask(list, task) {
    // e.preventDefault();
    console.log('Lists addTask list:', list, 'task:', task);
    Meteor.call('todo_lists.addTask', {list, title: task.value}, (list) => {
      // this.refs.title.value = '';
      console.log('List addTask list:', list);
    });
  }

  removeTask(list, task) {
    Meteor.call('todo_lists.removeTask', list, task);
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

export default Lists;

// export default createContainer(() => {
//   Meteor.subscribe('lists');
//   return { lists: TodoLists.find({}).fetch() }
// }, Lists);
