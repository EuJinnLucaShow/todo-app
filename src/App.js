import InputForm from 'components/InputForm';
import Notifications from 'components/Notifications';
import TodoList from 'components/TodoList';

const App = () => {
  return (
    <div className="todo-app">
      <h1 className="todo-title">TODO List</h1>
      <InputForm />
      <TodoList />
      <Notifications/>
    </div>
  );
};

export default App;
