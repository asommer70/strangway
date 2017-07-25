import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Lists from './components/lists';
import TodoLists from '../imports/collections/todo_lists';
import ListForm from './components/list_form';
// import { Template } from 'meteor/templating';
// import './main.html';
//
// // Foundation JavaScript init.
// Template.main.onRendered(function () {
//   $(document).foundation();
// });

class App extends Component {
  render() {
    $(document).foundation();

    return (
      <div className="row">
        <div className="large-10 column">
          <br/>
          <Lists />
        </div>

        <div className="large-2 column">
          <ListForm />
        </div>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
