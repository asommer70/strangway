import React, { Component } from 'react';
import moment from 'moment';
import { TodoLists } from '../../../imports/collections/todo_lists';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: (this.props.task ? this.props.task.complete : false),
      edit: false,
      title: (this.props.task ? this.props.task.tilte : '')
    }
  }

  checkTask(e) {
    const complete = (e.target.value == 'false' ? true : false);
    Meteor.call('todo_lists.completeTask', this.props.list, {_id: e.target.id, complete}, () => {
      this.setState({complete});
    });
  }

  editTask(list, task) {
    // this.setState({edit: !this.state.edit, title: this.props.task.title});
  }

  setTitle(e) {
    this.setState({title: e.target.value});
  }

  updateTask(e) {
    e.preventDefault();

    Meteor.call('todo_lists.updateTask', {list: this.props.list, task: this.props.task, newTitle: this.state.title});
    this.setState({edit: !this.state.edit});
  }

  render() {
    const {task} = this.props;
    let title = task.title;
    if (this.state.edit) {
      title = (
        <form onSubmit={this.updateTask.bind(this)}>
          <input type="text" name="title" value={this.state.title} onChange={this.setTitle.bind(this)} />
        </form>
      );
    }

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
              {title}
          </label>

          <div className="subheader created-at float-right">{moment(task.createdAt).fromNow()}</div>
          <button className="task-button button tiny alert float-right" type="button" onClick={() => this.props.removeTask(this.props.list, task)}>
            <svg version="1.1" baseProfile="basic"
               xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px"
               viewBox="0 0 128 128" xmlSpace="preserve">
              <path transform="matrix(0.128,0,0,0.128,0,0)" stroke="none" style={{fill: '#ffffff'}} d="M 500 0 C 223 0 0 223 0 500 C 0 775 223 1000 500 1000 C 775 1000 1000 775 1000 500 C 1000 223 775 0 500 0 z M 500 850 C 306 850 149 693 149 500 C 149 306 306 149 500 149 C 693 149 850 306 850 500 C 850 693 693 850 500 850 z M 670 579 C 695 604 695 645 670 670 C 645 695 604 695 579 670 L 500 591 L 419 670 C 394 695 353 695 328 670 C 303 645 303 604 328 579 L 408 500 L 328 419 C 303 394 303 353 328 328 C 353 303 394 303 419 328 L 500 408 L 579 328 C 604 303 645 303 670 328 C 695 353 695 394 670 419 L 591 500 L 670 579 z"/>
            </svg>
          </button>

          <button className="task-button button tiny primary float-right" type="button" onClick={() => this.setState({edit: !this.state.edit, title: this.props.task.title})}>
            <svg version="1.1" baseProfile="basic"
               xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px"
               viewBox="0 0 128 128" xmlSpace="preserve">
              <path transform="matrix(0.128,0,0,0.128,0,0)" stroke="none" style={{fill: '#ffffff'}} d="M 698 70 L 768 0 L 1000 231 L 929 301 L 698 70 z M 117 717 L 64 935 L 282 882 L 117 717 z M 796 434 L 306 925 L 0 1000 L 74 693 L 565 203 L 796 434 L 796 434 z M 830 401 L 896 334 L 665 103 L 598 169 L 830 401 z"/>
            </svg>
          </button>

        </div>
      </div>
    );
  }
}

export default Task;
