import React from 'react';
import List from './list';

const LISTS = [
  { _id: 1, name: 'Daily', archive: false, createdAt: '1500829836421' },
  { _id: 2, name: 'Strangway', archive: false, createdAt: '1500829862246' }
];

const Lists = () => {
  const RenderedLists = LISTS.map((list) => {
    return <List key={list._id} list={list} />
  });

  return (
    <ul>
      {RenderedLists}
    </ul>
  );
}

export default Lists;
