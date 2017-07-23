import React from 'react';
import ReactDOM from 'react-dom';
import Lists from './components/lists';
// import { Template } from 'meteor/templating';
// import './main.html';
//
// // Foundation JavaScript init.
// Template.main.onRendered(function () {
//   $(document).foundation();
// });

const App = () => {
  $(document).foundation();

  return (
    <div className="row">
      <div className="large-12 column">
        <br/>
        <Lists />
      </div>
    </div>
  );
}

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
