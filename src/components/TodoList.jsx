import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from 'redux/operations';
import ReactPaginate from 'react-paginate';

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
    <div>
      <ul className="tasks">
        {paginatedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos.length > PAGE_SIZE && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={Math.ceil(todos.length / PAGE_SIZE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default TodoList;
