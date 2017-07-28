import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Lists from './components/lists';
import TodoLists from '../imports/collections/todo_lists';
import Notes from '../imports/collections/notes';
import ListForm from './components/list_form';

class App extends Component {
  componentDidMount() {
    $(document).foundation();
  }

  render() {
    return (
      <div>
        <Header />

        <div className="row">
          <div className="large-10 column">
            <br/>
            <Lists />
          </div>

          <div className="large-2 column">
            <ListForm />
          </div>
        </div>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
