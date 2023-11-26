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
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default InputForm;
