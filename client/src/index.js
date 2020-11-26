import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { TodoListApp } from './components/TodoListApp';
import { store } from './redux/store';

import './styles/main.css';

render(
  <Provider store={store}>
    <TodoListApp />
  </Provider>,
  document.getElementById('react-container'),
);
