import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setTodosAction } from '../../redux/actions';
import { AddTodoForm } from '../AddTodoForm';
import { TodoList } from '../TodoList';

const TodoListAppComponent = ({ setTodos }) => {
  useEffect(() => {
    fetch('/api/todos')
      .then(
        response => response.json(),
        error => alert(`An error occurred. ${error}`),
      )
      .then(json => setTodos(json));
  }, []);

  return (
    <div>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

TodoListAppComponent.propTypes = { setTodos: PropTypes.func.isRequired };

export const TodoListApp = connect(
  null,
  dispatch => ({ setTodos: props => dispatch(setTodosAction(props)) }),
)(TodoListAppComponent);
