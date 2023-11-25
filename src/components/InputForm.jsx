import React from 'react';

const InputForm = ({ inputValue, setInputValue, addTask }) => {
  return (
    <div className="add-task">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default InputForm;
