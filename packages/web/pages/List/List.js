// @flow
import * as React from 'react';
import { pure, compose } from 'recompose';
import Header from '../../components/Header/Header';
import EventPanel from '../../components/EventPanel/EventPanel';
import AddButton from '../../components/AddButton/AddButton';

const List = () => (
  <div>
    <Header />
    <EventPanel />
    <AddButton />
  </div>
);

export default compose(pure)(List);
