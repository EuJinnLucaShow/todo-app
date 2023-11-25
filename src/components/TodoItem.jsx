import React from 'react';

const TodoItem = ({ task, toggleTaskStatus, deleteTask }) => {
  return (
    <div className="task">
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTaskStatus(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
