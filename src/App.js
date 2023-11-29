import InputForm from 'components/InputForm';
import TodoList from 'components/TodoList';
import Notifications from 'utils/Notifications';

const App = () => {
  return (
    <div className="todo-app">
      <h1 className="todo-title">TODO List</h1>
      <InputForm />
      <TodoList />
      <Notifications />
    </div>
  );
};

export default App;
