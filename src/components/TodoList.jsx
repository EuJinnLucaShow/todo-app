import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from 'redux/operations';

const TodoList = () => {
  const todos = useSelector(selectTodo);
  const reversedTodos = [...todos].reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul className="tasks">
      {reversedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
