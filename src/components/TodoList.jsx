import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { fetchTodos } from 'redux/operations';
import Pagination from '../utils/Pagination';

const PAGE_SIZE = 5;

const TodoList = () => {
  const todos = useSelector(selectTodo);
  const reversedTodos = [...todos].reverse();
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedTodos = reversedTodos.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  return (
    <>
      <ul className="tasks">
        {paginatedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos.length > PAGE_SIZE && (
        <Pagination
          pageCount={Math.ceil(todos.length / PAGE_SIZE)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          todosLength={todos.length}
          PAGE_SIZE={PAGE_SIZE}
        />
      )}
    </>
  );
};

export default TodoList;
