import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EditTodoItem = ({
  title,
  onRemove,
  onEdit,
}) => {
  const [todoTitle, setTodoTitle] = useState(title);

  return (
    <div className="todo-item edit">
      <input
        autoFocus
        placeholder="Edit todo item..."
        value={todoTitle}
        onKeyPress={event => {
          if (event.key === 'Enter' && todoTitle) {
            onEdit(todoTitle);
          }
        }}
        onChange={e => setTodoTitle(e.target.value)}
      />
      <div
        className="todo-rm-btn"
        onClick={onRemove}
      >
        X
      </div>
      <div
        className="todo-edit-btn"
        onClick={() => onEdit(todoTitle)}
      >
        ✓
      </div>
    </div>
  );
};

EditTodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
