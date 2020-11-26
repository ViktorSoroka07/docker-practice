import React from 'react';
import PropTypes from 'prop-types';

export const ShowTodoItem = ({
  title,
  onRemove,
  onEdit,
}) => (
  <div className="todo-item">
    <div
      className="todo-title"
      onClick={onEdit}
    >
      {title}
    </div>
    <div>
      <button
        className="todo-edit-btn start"
        onClick={onEdit}
      >
        ✎
      </button>
      <button
        className="todo-rm-btn"
        onClick={onRemove}
      >
        X
      </button>
    </div>
  </div>
);

ShowTodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
