import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { TodoLists } from '../../../imports/collections/todo_lists';
import ListForm from './list_form';
import Task from './task';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      list: (props.list ? props.list : [])
    }
  }

  addTask(e) {
    e.preventDefault();

    Meteor.call('todo_lists.addTask', {list: this.props.list, title: this.refs.title.value}, (list) => {
      this.refs.title.value = '';
    });
  }

  removeTask(list, task) {
    Meteor.call('todo_lists.removeTask', list, task);
  }

  render() {
    const renderedTasks = this.props.list.tasks.map((task) => {
      return (
        <div className="row" key={task._id}>
          <div className="large-12 column">
            <Task list={this.props.list} task={task} removeTask={this.removeTask.bind(this)} />
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="large-8 columns">
          <h2>{this.props.list.name}</h2>

          <form onSubmit={ this.addTask.bind(this) } action="#">
            <input type="text" name="title" ref="title" placeholder="New task..." />
          </form>
          <hr/><br/>

          {this.props.list.tasks.length == 0 ? 'No tasks... yet.' : renderedTasks}
        </div>

        <div className="large-4 columns">
          <br/>
          <button type="button" className="button tiny" onClick={() => this.setState({edit: !this.state.edit})}>
            Edit Todo List
          </button>
          {this.state.edit ? <ListForm list={this.props.list} removeList={this.props.removeList} /> : ''}
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('lists');
  return { list: TodoLists.findOne(props.list._id) }
}, List);
