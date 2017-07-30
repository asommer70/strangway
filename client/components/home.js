import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Header from './header';
import Lists from './lists/lists';
import ListForm from './lists/list_form';
import { TodoLists } from '../../imports/collections/todo_lists';

const Home = (props) => {
  return (
    <div>
      <div className="row">
        <div className="large-10 column">
          <br/>
          <Lists lists={props.lists} history={props.history} />
        </div>

        <div className="large-2 column">
          <ListForm />
        </div>
      </div>
    </div>
  )
}

export default createContainer((props) => {
  Meteor.subscribe('lists');
  return { lists: TodoLists.find({}).fetch() }
}, Home);
