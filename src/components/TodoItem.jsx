import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from 'redux/operations';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const deleteTask = id => {
    dispatch(deleteTodo(id));
  };

  const toggleTaskStatus = id => {
    const updatedTask = { id, completed: !todo.completed };
    dispatch(editTodo(updatedTask));
  };

  if (!todo) {
    return null;
  }

  return (
    <li className="task">
      <span className={todo.completed ? 'checked' : 'none'}>{todo.title}</span>
      <div className="btn-wrapper">
        <button className="btn-done" onClick={() => toggleTaskStatus(todo.id)}>
          Done
        </button>
        <button className="btn-delete" onClick={() => deleteTask(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
