import React from 'react';

const List = ({list}) => {
  return (
    <li><a href={'/lists/' + list._id}>{list.name}</a></li>
  );
}

export default List;
