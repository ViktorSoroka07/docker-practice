import React, {
  useCallback,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ShowTodoItem } from '../ShowTodoItem';
import { EditTodoItem } from '../EditTodoItem';
import {
  removeTodoAction,
  updateTodoAction,
} from '../../redux/actions';

const TodoListComponent = ({
  todos,
  removeTodo,
  updateTodo,
}) => {
  const [currentlyEditedId, setCurrentlyEditedId] = useState(null);

  const handleRemove = useCallback(id => {
    removeTodo(id);
    fetch(`/api/todos/${id}`, { method: 'DELETE' });
  }, []);

  const handleEditComplete = useCallback((prevTitle, updatedTitle) => {
    if (prevTitle === updatedTitle) {
      setCurrentlyEditedId(null);

      return;
    }

    const updatedTodo = {
      id: currentlyEditedId,
      title: updatedTitle,
    };

    updateTodo(updatedTodo);
    fetch(`/api/todos/${currentlyEditedId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
      headers: { 'Content-Type': 'application/json' },
    });
    setCurrentlyEditedId(null);
  }, [currentlyEditedId]);

  return (
    <div>
      {todos.map(({
        title,
        id,
      }) => (id === currentlyEditedId ? (
        <EditTodoItem
          key={id}
          title={title}
          onRemove={() => handleRemove(id)}
          onEdit={handleEditComplete}
        />
      ) : (
        <ShowTodoItem
          key={id}
          title={title}
          onRemove={() => handleRemove(id)}
          onEdit={() => setCurrentlyEditedId(id)}
        />
      )))}
    </div>
  );
};

TodoListComponent.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export const TodoList = connect(
  state => ({ todos: state.todos }),
  dispatch => ({
    removeTodo: props => dispatch(removeTodoAction(props)),
    updateTodo: props => dispatch(updateTodoAction(props)),
  }),
)(TodoListComponent);
