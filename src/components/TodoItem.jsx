import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from 'redux/todoSlice';

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();

  const deleteTask = taskId => {
    dispatch(removeTodo(taskId));
  };

  const toggleTaskStatus = taskId => {
    dispatch(toggleTodo(taskId));
  };

  if (!task) {
    return null;
  }

  return (
    <li className="task">
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTaskStatus(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
