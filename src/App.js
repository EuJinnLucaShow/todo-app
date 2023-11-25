import InputForm from 'components/InputForm';
import TodoList from 'components/TodoList';
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        title: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>TODO List</h1>
      <InputForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTask={addTask}
      />
      <TodoList
        tasks={tasks}
        toggleTaskStatus={toggleTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
