import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './fontAwesome';

import Shop from './Shop';

export const Main = () => {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
};
