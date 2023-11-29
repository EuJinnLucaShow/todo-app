import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { addTodo } from 'redux/operations';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setInputValue(e.target.value || '');
  };

  const addTask = () => {
    if (inputValue.trim() === '') {
      return toast.error('The field cannot be empty.');
    }

    const newTask = {
      title: inputValue.trim(),
      completed: false,
    };

    dispatch(addTodo(newTask));
    toast.success('New task added.');
    setInputValue('');
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
