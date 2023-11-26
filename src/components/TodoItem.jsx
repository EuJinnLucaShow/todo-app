import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from 'redux/operations';

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();

  const deleteTask = id => {
    dispatch(deleteTodo(id));
  };

  const toggleTaskStatus = id => {
    const updatedTask = { id, completed: !task.completed };
    dispatch(editTodo(updatedTask));
  };

  if (!task) {
    return null;
  }

  return (
    <li className="task">
      <span className={task.completed ? 'checked' : 'none'}>{task.title}</span>
      <button onClick={() => toggleTaskStatus(task.id)}>Done</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
