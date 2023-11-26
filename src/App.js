import InputForm from 'components/InputForm';
import TodoList from 'components/TodoList';

const App = () => {
  return (
    <div className="todo-app">
      <h1>TODO List</h1>
      <InputForm />
      <TodoList />
    </div>
  );
};

export default App;
