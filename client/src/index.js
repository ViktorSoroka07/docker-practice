import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import TodoListApp from './components/TodoList/TodoListApp'
import storeFactory from './store'
import {fetchTodos} from './actions'

import './styles/main.css'

const store_ = storeFactory();

//Get todos for initial list render
store_.dispatch(fetchTodos())

render(
  <Provider store={store_}>
    <TodoListApp/>
  </Provider>,
  document.getElementById("react-container")
)
