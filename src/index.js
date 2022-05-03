import React from 'react';
import { App } from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './user_store/helper';

// setup fake backend
import { configureFakeBackend } from './user_store/helper';
configureFakeBackend();


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

