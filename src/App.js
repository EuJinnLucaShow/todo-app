import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import InputForm from './components/InputForm';
import Title from './components/Title';
import TodoList from './components/TodoList';
import Notifications from './utils/Notifications';

const App = () => {
  return (
    <div className="todo-app">
      <div className="header">
        <Title />
        <InputForm />
      </div>
      <TodoList />
      <Notifications />
    </div>
  );
};

export default App;
