import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from 'redux/operations';

const TodoList = () => {
  const todos = useSelector(selectTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul className="tasks">
      {todos.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TodoList;
