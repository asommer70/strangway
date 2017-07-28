import React from 'react';
import Header from './header';
import Lists from './lists';
import ListForm from './list_form';

export default (props) => {
  return (
    <div>
      <div className="row">
        <div className="large-10 column">
          <br/>
          <Lists history={props.history} />
        </div>

        <div className="large-2 column">
          <ListForm />
        </div>
      </div>
    </div>
  )
}
