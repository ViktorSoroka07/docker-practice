import {
  createStore,
  combineReducers,
} from 'redux';

import { todos } from '../reducers';
import { initialStoreState } from './initialState';

const initStore = () => {
  const initialStore = localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : initialStoreState;

  return createStore(combineReducers({ todos }), initialStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

export const store = initStore();
