import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router-dom';
import { TodoLists } from '../../../imports/collections/todo_lists';
import List from './list';
import ListForm from './list_form';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 'No Todo List selected... yet.',
      creatList: false
    };
  }

  selectList(e) {
    e.preventDefault();
    const listy = (
      <List list={this.props.lists[e.target.dataset.idx]}
        removeList={this.removeList.bind(this)} idx={e.target.dataset.idx} />
    );
    this.setState({list: listy});
  }

  removeList(e) {
    Meteor.call('todo_lists.remove', this.props.lists[e.target.dataset.idx], () => {
      this.setState({list: 'List removed, please select another.'});
    });
  }

  render() {
    if (!this.props.lists) { return <div>No Lists... yet.</div>; }

    const RenderedLists = this.props.lists.map((list, idx) => {
      return (
        <li key={list._id}>
          <a href="#" onClick={this.selectList.bind(this)} data-idx={idx}>{list.name}</a>

          <span className="badge primary float-right">
            {list.tasks ? list.tasks.filter((task) => { if (!task.complete) { return task } }).length : ''}
          </span>
        </li>
      )
    });

    return (
      <div className="row">
        <div className="large-2 columns">
          <ul className="spaced no-bullet">
            {RenderedLists}
          </ul>

          <br/><hr/>
          <button type="button" className="button tiny" onClick={() => this.setState({createList: !this.state.createList})}>
            Create List
          </button>
          {this.state.createList ? <ListForm /> : '' }
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
