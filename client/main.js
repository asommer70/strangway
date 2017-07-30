import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/home';
import Header from './components/header';
import List from './components/lists/list';
import NotesList from './components/notes/notes_list';
import Note from './components/notes/note';

import TodoLists from '../imports/collections/todo_lists';
import Notes from '../imports/collections/notes';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(document).foundation();
  }

  render() {
    return (
      <div>
        <Header />

        {this.props.children}
      </div>
    );
  }
}

const routes = (
  <Router history={history}>
    <App>
      <Route exact path="/" component={Home} />
      <Route path="/lists/:id" component={List} />
      <Route path="/notes" component={NotesList} />
      <Route path="/notes/:id" component={Note} />
    </App>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
