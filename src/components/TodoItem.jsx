import React from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const { id, title, completed } = todo;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" checked={completed} onChange={() => {}} />
      <p className={completed ? 'completed' : ''}>{title}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
