import React from 'react';
import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { useSelector } from 'react-redux';

const TodoList = () => {
  const todos = useSelector(selectTodo);

  return (
    <ul className="tasks">
      {todos?.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TodoList;
