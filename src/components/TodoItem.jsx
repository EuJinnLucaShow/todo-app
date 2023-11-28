// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteTodo, editTodo } from 'redux/operations';

// const TodoItem = ({ todo }) => {
//   const dispatch = useDispatch();

//   const deleteTask = id => {
//     dispatch(deleteTodo(id));
//   };

//   const toggleTaskStatus = id => {
//     const updatedTask = { id, completed: !todo.completed };
//     dispatch(editTodo(updatedTask));
//   };

//   if (!todo) {
//     return null;
//   }

//   return (
//     <li className="task">
//       <span className={todo.completed ? 'checked' : 'none'}>{todo.title}</span>
//       <div className="btn-wrapper">
//         <button className="btn-done" onClick={() => toggleTaskStatus(todo.id)}>
//           Done
//         </button>
//         <button className="btn-delete" onClick={() => deleteTask(todo.id)}>
//           Delete
//         </button>
//       </div>
//     </li>
//   );
// };

// export default TodoItem;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from 'redux/operations';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const deleteTask = id => {
    dispatch(deleteTodo(id));
  };

  const toggleTaskStatus = id => {
    const updatedTask = { id, completed: !todo.completed };
    dispatch(editTodo(updatedTask));
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    const updatedTask = { ...todo, title: editedTitle };
    dispatch(editTodo(updatedTask));
    setEditable(false);
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
