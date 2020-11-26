import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import { addTodoAction } from '../../redux/actions';

const AddTodoFormComponent = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const id = v4();

    addTodo({
      id,
      title,
    });

    setTitle('');

    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="todo-add-form">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Add todo here..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

AddTodoFormComponent.propTypes = { addTodo: PropTypes.func.isRequired };

export const AddTodoForm = connect(
  null,
  dispatch => ({ addTodo: props => dispatch(addTodoAction(props)) }),
)(AddTodoFormComponent);
