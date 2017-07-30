import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { TodoLists } from '../../../imports/collections/todo_lists';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: (this.props.task ? this.props.task.complete : false)
    }
  }

  checkTask(e) {
    const complete = (e.target.value == 'false' ? true : false);
    Meteor.call('todo_lists.completeTask', this.props.list, {_id: e.target.id, complete}, () => {
      this.setState({complete});
    });
  }

  removeTask(listId, task) {
    console.log('Task removeTask..');
    Meteor.call('todo_lists.removeTask', listId, task);
  }

  render() {
    const {task} = this.props;

    return (
      <div className="row task">
        <div className="large-1 column">
          <input type="checkbox" name="complete"
            id={task._id}
            value={this.state.complete}
            checked={this.state.complete}
            onChange={this.checkTask.bind(this)}/>
        </div>

        <div className="large-11 column">
          <label className={this.state.complete ? 'task-label checked' : 'task-label'} htmlFor={task._id}>
              {task.title}
          </label>

          <div className="subheader created-at float-right">{moment(task.createdAt).fromNow()}</div>
          <button className="remove-task button tiny secondary float-right"
            type="button"
            onClick={() => this.removeTask(this.props.list._id, task)}>
            Remove
          </button>

        </div>
      </div>
    );
  }
}

export default Task;
// export default createContainer((props) => {
//   Meteor.subscribe('lists');
//   return { lists: TodoLists.findOne(props.list._id) }
// }, Task);
