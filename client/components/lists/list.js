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

  render() {
    const renderedTasks = this.props.list.tasks.map((task) => {
      return (
        <div className="row" key={task._id}>
          <div className="large-12 column">
            <Task list={this.props.list} task={task} removeTask={this.props.removeTask.bind(this)} />
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="large-8 columns">
          <h2>{this.props.list.name}</h2>

          <form onSubmit={ (e) => {e.preventDefault(); this.props.addTask(this.props.list, this.refs.title); this.refs.title = '';} } action="#">
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

export default List;

// export default createContainer((props) => {
//   Meteor.subscribe('lists');
//   return { lists: TodoLists.findOne(props.list._id) }
// }, List);
