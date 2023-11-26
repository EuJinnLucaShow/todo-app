import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodo } from 'redux/selectors';
import { addTodo } from 'redux/todoSlice';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(selectTodo);

  const handleInputChange = e => {
    setInputValue(e.target.value || ''); 
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: todos.length + 1,
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
