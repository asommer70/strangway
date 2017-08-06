import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Header from './header';
import Lists from './lists/lists';
import ListForm from './lists/list_form';
import { TodoLists } from '../../imports/collections/todo_lists';

const Home = (props) => {
  // <div className="large-2 column">
  //   <ListForm />
  // </div>
  return (
    <div>
      <div className="row">
        <div className="large-12 column">
          <br/>
          <Lists lists={props.lists} history={props.history} />
        </div>
      </div>
    </div>
  )
}

export default createContainer((props) => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Home);
