import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from 'redux/operations';
import { toast } from 'react-toastify';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const deleteTask = id => {
    dispatch(deleteTodo(id));
    toast.info('The task was deleted.');
  };

  const toggleTaskStatus = id => {
    const updatedTask = { id, completed: !todo.completed };
    dispatch(editTodo(updatedTask));
    toast('Task status changed.');
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      return toast.error('The field cannot be empty.');
    }

    if (editedTitle.trim() === todo.title) {
      return toast.error('The task name is not changed.');
    }

    const updatedTask = { ...todo, title: editedTitle };
    dispatch(editTodo(updatedTask));
    setEditable(false);
    toast.info('Task name has been changed.');
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditable(false);
  };

  const handleInputChange = event => {
    setEditedTitle(event.target.value);
  };

  if (!todo) {
    return null;
  }

  return (
    <li className="task">
      {editable ? (
        <input
          className="input-edit"
          type="text"
          value={editedTitle}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <span className={todo.completed ? 'checked' : 'none'}>
          {todo.title}
        </span>
      )}
      <div className="btn-wrapper">
        {editable ? (
          <>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="btn-done"
              onClick={() => toggleTaskStatus(todo.id)}
            >
              Done
            </button>
            <button className="btn-delete" onClick={() => deleteTask(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
