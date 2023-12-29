import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const paginatedTodos = reversedTodos.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(paginatedTodos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, todos]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const onDragEnd = result => {
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <>
      <ul className="tasks">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className="tasks-div"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
