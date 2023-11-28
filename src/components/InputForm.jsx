import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from 'redux/operations';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInputValue(e.target.value || '');
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        title: inputValue,
        completed: false,
      };

      dispatch(addTodo(newTask));
      setInputValue('');
    }
  };

  return (
    <div className="add-task">
      <input
        className="input-task"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter task..."
      />
      <button className="btn-task" onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default InputForm;
